
export class ApiError extends Error {
    public command: string;
    public code: string;
    public status?: number;

    constructor(message: string, command: string, code: string, status?: number) {
        super(message);
        this.command = command;
        this.code = code;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
