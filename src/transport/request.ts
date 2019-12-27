export type Method = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export interface RequestHeaders {
    [key: string]: string;
}

export interface RequestParams {
    [key: string]: any;
}

export interface RequestOptions {
    headers?: RequestHeaders;
    params?: RequestParams;
    data?: RequestParams | FormData;
}

export interface RequestError {
    error?: string;
    code: string;
    message: string;
}
