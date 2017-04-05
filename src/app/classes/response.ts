export class Response {
    success: boolean; // true if the request is successful
    statusCode?: number;
    message: string;

    constructor(success: boolean, message: string, statusCode?: number) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
    }
}