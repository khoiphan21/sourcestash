/**
 * The class representing the model for a card.
 * 
 */
export class Board {
    owner_id: string;
    board_id: string;
    title: string;
    constructor(
        id: string,
        board_id: string,
        title: string
    ) {
        this.owner_id = id;
        this.board_id = board_id;
        this.title = title;
    }
}