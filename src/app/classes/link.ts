/**
 * The class representing the model for a link
 */
export class Link {
    link_id: string;
    card_id: string;
    stackingOrder: number;
    title: string;
    x_location: number;
    y_location: number;
    
    constructor(
        link_id: string,
        card_id: string,
        title: string,
        stackingOrder: number,
        x_location: number,
        y_location: number 
    ) {
        this.link_id = link_id;
        this.card_id = card_id;
        this.title = title;
        this.stackingOrder = stackingOrder;
        this.x_location = x_location;
        this.y_location = y_location;
    }
}