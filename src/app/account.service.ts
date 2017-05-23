import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// The back-end server
import { SERVER } from './classes/SERVER';

import { Account } from './classes/account';
import { AppResponse } from './classes/response';
import { JOHN } from './data/mockAccount';
import { Stash } from './classes/stash';

// import * as gapiFunction from 'google-client-api';
import { GoogleApiService } from './google-api.service';
import { Deferred } from './classes/deferred';

export const LOCAL_STORAGE_KEY = "sourcestash_user";

@Injectable()
/**
 * This service handles the following:
 *   1. Account creation
 *   2. Retrieving user information -> profile page
 *   3. Logging in
 */
export class AccountService {
  // Flag to check if the user is logged in
  private isLoggedIn: boolean;
  // Current user
  private currentUser: Account;
  // Google Javascript Client Library
  private gapi: any;
  // Google OAuth2 Client
  private GoogleAuth: any;

  /**
   * TODO: First check in localstorage to see if there is user information stored 
   * If so, retrieve it and log the user in
   */
  constructor(
    private http: Http,
    private googleApi: GoogleApiService,
    private router: Router
  ) {
    // TODO check local storage to attempt to log the user in
    this.isLoggedIn = false;

    // Check if a user is stored in localStorage
    let user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (user != null) {
      this.updateCurrentUser(user);
    } else {
      this.router.navigate(['/login']);
    }
  }


  /**
   * Create an account based on the given parameters.
   * A user id is generated by hashing the email address
   * 
   * @param accountDetails the details of the account
   */
  createAccount(accountDetails: Account): Observable<AppResponse> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(
      SERVER + '/signup',
      { account: accountDetails },
      options
    ).map(response => {
      return new AppResponse(true, 'Account creation is successful');
    }).catch(error => {
      alert(error.text());
      return Observable.throw('Failed to create account');
    });
  }

  updateAccount(accountDetails: Account): Observable<AppResponse> {
    return new Observable();
  }

  /**
   * Delete a user from the database
   * 
   * @param email - the email of the user to be deleted
   */
  deleteAccount(email: string) {
    let options: RequestOptions;
    this.setupHeaderOptions(options);

    return this.http.post(
      SERVER + '/delete/user/' + email,
      options
    );
  }

  /**
   * Check the email address given to make sure it's not a registered email
   * 
   * @param email the email address to be checked
   */
  checkEmail(email: string): Observable<AppResponse> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(
      SERVER + '/check-email',
      {
        email: email
      },
      options
    ).map(response => {
      let responseObject = response.json();
      if (responseObject.isAvailable) {
        return new AppResponse(true, 'This email is OK');
      } else {
        return new AppResponse(false, 'This email is not available');
      }
    }).catch(error => {
      return Observable.throw(error);
    })
  }

  getCurrentUserID(): string {
    return this.currentUser.user_id;
  }

  /**
   * Get the ID of the user with the given email
   * 
   * @param email - the email of the user
   */
  getUserID(email: string): Promise<string> {
    let userID: string;

    let promise = new Deferred<string>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    // Make a call to the API for the user id
    if (this.currentUser) {
      this.http.post(
        SERVER + '/user/id',
        {
          email: email
        },
        options
      ).subscribe(response => {
        let data = response.json();
        let id = '' + data.user_id;

        promise.resolve(id);
      }, error => {
        promise.reject(error);
      });
    } else {
      promise.reject('No user is currently logged in');
    }

    return promise.promise;
  }

  /**
   * Try to log a user in, and return the response from the server
   * 
   * Also store the user's login information in localstorage, to automatically 
   * log them in when they navigate to the page
   * 
   * @param email the email, and also the id, of the account
   * @param password self explanatory
   */
  login(email: string, password: string): Promise<AppResponse> {
    let deferred = new Deferred<AppResponse>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(
      SERVER + '/login',
      {
        email: email,
        password: password
      },
      options
    ).subscribe(response => {
      alert('Login Successful!');

      // Set the flag that tells the app the user has been logged in
      this.isLoggedIn = true;

      // Update current user details
      this.currentUser = new Account(email, password);
      this.getUserID(email).then(id => {
        this.currentUser.user_id = id;
        deferred.resolve(new AppResponse(true, 'Logged in successfully'));
      });
    }, error => {
      console.log(error);
      console.log('login failed. error thrown');
      deferred.reject(error);
    });

    return deferred.promise;
  }

  loginWithGoogle(): Promise<AppResponse> {
    // To give the api service a handle of this service
    this.googleApi.registerAccountService(this);

    return this.googleApi.login().then(account => {
      this.updateCurrentUser(account);
      this.getUserID(this.currentUser.email).then(id => {
        this.currentUser.user_id = id;
        this.updateCurrentUser(this.currentUser);
      });
      return new AppResponse(true, 'Logged in successfully');
    }).catch(error => {
      console.log(error);
      return new AppResponse(false, 'An error has occurred', error);
    })
  }

  /**
   * Check if the user is logged in
   * 
   * @return a boolean value: True if the user is logged in, False otherwise.
   */
  checkLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  /**
   * Update the currently logged in user of the app
   * 
   * @param user - The current user that is logged in
   */
  updateCurrentUser(user: Account) {
    this.currentUser = user;
    this.isLoggedIn = true;

    // Store the current user in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  getCurrentUser(): Account {
    return this.currentUser;
  }

  /**
   * Log the user out. Also clear localstorage to make sure user is not 
   * auto-logged in the next time they visit the site.
   */
  logout() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      this.currentUser = null;

      // clear localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, null);

      // Officially signout from google
      this.googleApi.logout();
    }
  }

  /**
   * Retrieve the basic information of a user
   * 
   * @param user_id - the id of the user
   * @return a promise of the account. The promise is rejected if the id doesn
   *         not exist
   */
  getUserInformation(user_id: string): Promise<Account> {
    let deferred = new Deferred<Account>();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(
      SERVER + '/user/info', { user_id: user_id }, options
    ).subscribe(userInfo => {
      deferred.resolve(userInfo.json());
    }, error => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  /**
   * Send request to server to edit the user's information, 
   * based on the given account details, and return server's response
   * 
   * @param id - the id of the user, just for double-checking
   * @param account - the object containing all information to be updated
   */
  editUserInformation(id: string, account: Account): Promise<AppResponse> {

    return Promise.resolve(new AppResponse(true, 'All good'));
  }

  /**
   * HELPER METHODS
   */
  setupHeaderOptions(options: RequestOptions) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    options = new RequestOptions({ headers: headers });
  }
}
