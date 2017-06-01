import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AccountService } from './account.service';
import { Account } from './classes/account';
import { SERVER } from './classes/SERVER';

export const API_KEY = 'AIzaSyB6MX7fPuCT_z2Onp2UEvv-fDSIWUE-TJM';
export const CLIENT_ID = '1055581564231-u2ldu55490tvbnvrg6u6806gghati9o7.apps.googleusercontent.com';

/**
 * Google API variables
 */
declare var gapi: any;
var globalHttp: Http; // This variable is needed to let gapi access the http service
var globalAccountService: AccountService;
var globalGoogleApiService: GoogleApiService;
var globalLoginPromise: Deferred<Account>;

class Deferred<Account> {
  promise: Promise<Account>;
  resolve: (value: Account | PromiseLike<Account>) => void;
  reject: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<Account>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

@Injectable()
export class GoogleApiService {
  private accountService: AccountService;

  constructor(
    private http: Http
  ) {
    globalHttp = http;
    globalGoogleApiService = this;


  }

  registerAccountService(service: AccountService) {
    this.accountService = service;
  }

  logout() {
    gapi.load('client', finallyLogout)
    function finallyLogout() {
      gapi.client.init({
        // Initialize the client with API key and People API, and initialize OAuth with an
        // OAuth 2.0 client ID and scopes (space delimited string) to request access.
        apiKey: API_KEY,
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/plus.me'
      }).then(() => {
        gapi.auth2.getAuthInstance().signOut();
      });
    }
  }

  login(): Promise<Account> {
    // Try using google api
    gapi.load('client', start);
    // Setup the deferred object
    globalLoginPromise = new Deferred<Account>();

    return globalLoginPromise.promise;



    function updateSigninStatus(isSignedIn) {

      // When signin status changes, this function is called.
      // If the signin status is changed to signedIn, we make an API call.
      if (isSignedIn) {
        makeApiCall();
      }
    }

    function start() {
      gapi.client.init({
        // Initialize the client with API key and People API, and initialize OAuth with an
        // OAuth 2.0 client ID and scopes (space delimited string) to request access.
        apiKey: API_KEY,
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/plus.me'
      }).then(() => {
        // Get the Oauth2 Client
        var GoogleAuth = gapi.auth2.getAuthInstance();

        // Signout first
        GoogleAuth.signOut();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        if (GoogleAuth.isSignedIn.get()) {
          makeApiCall();
        } else {
          console.log('opening popup');
          // Call the Authorization server
          try {
            GoogleAuth.signIn()
          }
          catch (e) {
            alert("Pop-up Blocker is enabled! Please add this site to your exception list.");
          }
        }
      })
    }

    function handleSignInClick(event) {
      // Ideally the button should only show up after gapi.client.init finishes, so that this
      // handler won't be called before OAuth is initialized.
      gapi.auth2.getAuthInstance().signIn();
    }
    function handleSignOutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }

    function makeApiCall() {
      // Make an API call to the People API, and print the user's given name.
      gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.email_addresses,person.names,person.metadata'
      }).then(function (response) {
        console.log(response.result);

        // Now make http calls to the server to log in
        let headers = new Headers({
          'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        let account = {
          email: response.result.emailAddresses[0].value,
          social_id: response.result.etag,
          firstname: response.result.names[0].givenName,
          lastname: response.result.names[0].familyName
        }
        // Store the account
        let storedAccount = new Account(account.email, account.social_id);
        storedAccount.firstName = account.firstname;
        storedAccount.lastName = account.lastname;


        // Send a request to the server to login
        globalHttp.post(
          SERVER + '/login/google',
          {
            account: account
          },
          options
        ).subscribe(response => {
          // TODO: The response should contain the full account of the user
          globalLoginPromise.resolve(storedAccount);

        }, error => {
          console.log('error received: \n' + error);
          globalLoginPromise.reject(error);
          return Observable.throw(error);
        });

      }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
        globalLoginPromise.reject(reason);
      });
    }

  }

}
