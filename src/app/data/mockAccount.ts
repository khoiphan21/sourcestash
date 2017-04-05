import { Account } from '../classes/account';

export const JOHN: Account = {
    username: 'john@example.com',
    password: 'password'
}

export const WITH_STASHES: Account = {
    username: 'with-stashes',
    password: 'password',
    stashes: [
        {
            id: 'stash-1',
            title: 'Stash 1',
            description: 'Stash 1 Description'
        }
    ]
}