export class ApiError extends Error {
    public uri: string;
    public code: string;
    public status?: number;

    constructor(message: string, uri: string, code: string, status?: number) {
        super(message);
        this.uri = uri;
        this.code = code;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
