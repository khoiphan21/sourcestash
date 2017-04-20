import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'; // needed for the 'throw' operator to work
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AccountService } from './account.service';
import { Account } from './classes/account';

/**
 * Google API variables
 */
declare var gapi: any;
var globalHttp: Http; // This variable is needed to let gapi access the http service
var globalAccountService: AccountService;
var globalGoogleApiService: GoogleApiService;
var globalLoginPromise: Deferred<Account>;

/**
  * SERVER DEVELOPMENT LINKS
  */
const DEVELOPMENT_SERVER: string = 'http://localhost:8080';
const BETA_SERVER: string = 'https://application-server-dot-source-stash-beta.appspot.com';
const PRODUCTION_SERVER: string = 'https://application-server-dot-source-stash.appspot.com';
const SERVER: string = DEVELOPMENT_SERVER;

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

    // Setup the deferred object
    globalLoginPromise = new Deferred<Account>();
  }

  registerAccountService(service: AccountService) {
    this.accountService = service;
  }

  login(): Promise<Account> {
    // Try using google api
    console.log(gapi);
    gapi.load('client', start);

    return globalLoginPromise.promise;



    function updateSigninStatus(isSignedIn) {
      // When signin status changes, this function is called.
      // If the signin status is changed to signedIn, we make an API call.
      if (isSignedIn) {
        makeApiCall();
      }
    }

    function start() {
      console.log(globalHttp);
      gapi.client.init({
        // Initialize the client with API key and People API, and initialize OAuth with an
        // OAuth 2.0 client ID and scopes (space delimited string) to request access.
        apiKey: 'AIzaSyD03DZ1SDSOrp6oQaI3tCEFlFxUJqGhjVU',
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: '205519557302-q4govtrihn5t8ttp0p60q0r93f6fcqmo.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/plus.me'
      }).then(() => {
        // Get the Oauth2 Client
        var GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Call the Authorization server
        GoogleAuth.signIn();

        // Handle the initial sign-in state.
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          makeApiCall();
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
      console.log(gapi);
      // Make an API call to the People API, and print the user's given name.
      gapi.client.people.people.get({
        resourceName: 'people/me'
      }).then(function (response) {
        // Now make http calls to the server to log in
        console.log('Logging in with Google');
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
          DEVELOPMENT_SERVER + '/login/google',
          {
            account: account
          },
          options
        ).map(response => {
          // TODO: The response should contain the full account of the user
          console.log('response is: \n' + response);
          globalLoginPromise.resolve(storedAccount);

        }).catch(error => {
          console.log('error received: \n' + error);
          globalLoginPromise.reject(error);
          return Observable.throw(error);
        }).subscribe();

      }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
        globalLoginPromise.reject(reason);
      });
    }

  }

}
