import { Headers, RequestOptions } from '@angular/http';

import * as _ from 'underscore';

export class Helper {
    /**
   * Check the arguments to see if any is null.
   * 
   * @param args - the array of arguments to be checked
   * @return true if any of the argument is null, false otherwise
   */
  public static checkForNull(args: any[]): boolean {
    let flag: boolean = false;

    _.each(args, arg => {
      if (arg == null) {
        flag = true;
      }
    })

    return flag;
  }
  public static setupHeaderOptions(options: RequestOptions) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    options = new RequestOptions({ headers: headers });
  }
}