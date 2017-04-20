export class AppResponse {
    success: boolean; // true if the request is successful
    error?: any;
    message: string;

    constructor(success: boolean, message: string, error?: any) {
        this.success = success;
        this.error = error;
        this.message = message;
    }
}