import { BackgroundInfo } from './backgroundInfo';

export class Account {
    username: string;
    password: string;
    profilePictureURL?: string;
    favouriteStashes?: string[]; // the id of the stashes
    publishedStashes?: string[]; // the id of the stashes
    likedStashes?: number; // total number of likes from all stashes and sources
    backgroundInfo?: BackgroundInfo; 
    Education?: string[]; // list of educations
}