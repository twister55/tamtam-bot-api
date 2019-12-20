
export class ApiError extends Error {
    public readonly status: number;
    public readonly code: string;

    constructor(status: number, code: string, message: string) {
        super(message);
        this.status = status;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
