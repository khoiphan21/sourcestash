import { BackgroundInfo } from './backgroundInfo';
import { Stash } from './stash';

export class Account {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    profilePictureURL?: string;
    favouriteStashes?: string[]; // the id of the stashes
    publishedStashes?: string[]; // the id of the stashes
    likedStashes?: number; // total number of likes from all stashes and sources
    backgroundInfo?: BackgroundInfo; 
    Education?: string[]; // list of educations
    stashes?: Stash[]; // list of the stashes they own

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}