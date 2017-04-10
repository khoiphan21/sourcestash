import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Account } from './classes/account';
import { AppResponse } from './classes/response';
import { JOHN } from './data/mockAccount';
import { Stash } from './classes/stash';

/**
  * SERVER DEVELOPMENT LINKS
  */
const DEVELOPMENT_SERVER: string = 'http://localhost:8080';
const PRODUCTION_SERVER: string = 'https://application-server-dot-source-stash.appspot.com';
const SERVER: string = DEVELOPMENT_SERVER;


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

  /**
   * First check in localstorage to see if there is user information stored 
   * If so, retrieve it and log the user in
   */
  constructor(
    private http: Http
  ) {
    // TODO check local storage to attempt to log the user in
    this.isLoggedIn = false;
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
      console.log(response);
      return new AppResponse(true, 'Account creation is successful');
    }).catch(error => {
      alert(error.text());
      return Observable.throw('Failed to create account');
    });
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

  /**
   * Try to log a user in, and return the response from the server
   * 
   * Also store the user's login information in localstorage, to automatically 
   * log them in when they navigate to the page
   * 
   * @param email the email, and also the id, of the account
   * @param password self explanatory
   */
  login(email: string, password: string): Observable<AppResponse> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(
      SERVER + '/login',
      {
        email: email,
        password: password
      },
      options
    ).map(response => {
      alert('Login Successful!');

      // Set the flag that tells the app the user has been logged in
      this.isLoggedIn = true;

      return new AppResponse(true, 'Login successful');
    }).catch(error => {
      console.log(error);
      console.log('login failed. error thrown');
      return Observable.throw(error);
    });

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
   * Log the user out. Also clear localstorage to make sure user is not 
   * auto-logged in the next time they visit the site.
   */
  logout() {

  }

  /**
   * 
   * @param id - the id of the user, should be calculated from the email
   * @return a promise of the acocunt. The promise is rejected if the id doesn
   *         not exist
   */
  getUserInformation(id: string): Promise<Account> {
    /*
     * If id doesn't exist, will call Promise.reject('message')
     */


    return Promise.resolve(JOHN);
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
   * METHODS FOR TESTING
   */
  testLogin(email: string, password: string) {
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
      console.log(response.status);
    });
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
