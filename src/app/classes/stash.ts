export class Stash {
    title: string;
    description: string;
    stashID?: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}