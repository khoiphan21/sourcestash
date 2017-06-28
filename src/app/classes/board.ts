/**
 * The class representing the model for a board.
 */
export class Board {
    owner_id: string;
    board_id: string;
    title: string;
    constructor(
        owner_id: string,
        board_id: string,
        title: string
    ) {
        this.owner_id = owner_id;
        this.board_id = board_id;
        this.title = title;
    }
}