import { Account } from '../classes/account';

export const JOHN: Account = {
    email: 'john@example.com',
    password: 'password'
}

export const WITH_STASHES: Account = {
    email: 'with-stashes',
    password: 'password',
    stashes: [
        {
            id: 'stash-1',
            title: 'Stash 1',
            description: 'Stash 1 Description'
        }
    ]
}