/**
 * The class representing the model for a card.
 * 
 */
export class Card {
    card_id: string;
    board_id: string;
    title: string;
    x_location: number;
    y_location: number;
    constructor(
        id: string,
        board_id: string,
        title: string,
        x_location: number,
        y_location: number
    ) {
        this.card_id = id;
        this.board_id = board_id;
        this.title = title;
        this.x_location = x_location;
        this.y_location = y_location;
    }
}