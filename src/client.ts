import { Transport, Method, RequestOptions, RequestParams } from 'transport';

import { ApiError } from './error';

export class Client {
    public readonly host: string;
    public readonly token: string;
    public readonly transport: Transport;
    public readonly version: string;

    constructor(token: string, host: string, transport: Transport, version: string) {
        this.token = token;
        this.host = host.charAt(host.length - 1) === '/' ? host : host + '/';
        this.transport = transport;
        this.version = version;
    }

    public get<R>(endpoint: string, params: RequestParams = {}): Promise<R> {
        return this.request('GET', endpoint, {
            params
        });
    }

    public post<R>(command: string, options: Partial<RequestOptions> = {}): Promise<R> {
        return this.request('POST', command, options);
    }

    public put<R>(command: string, options: Partial<RequestOptions> = {}): Promise<R> {
        return this.request('PUT', command, options);
    }

    public delete<R>(command: string, options: Partial<RequestOptions> = {}): Promise<R> {
        return this.request('DELETE', command, options);
    }

    public patch<R>(command: string, options: Partial<RequestOptions> = {}): Promise<R> {
        return this.request('PATCH', command, options);
    }

    protected request<R>(method: Method, command: string, options: Partial<RequestOptions>): Promise<R> {
        options.params = options.params || {};
        options.params.access_token = this.token;
        options.params.v = this.version;

        return this.transport.request<R>(method, this.host + command, options).catch(error => {
            throw new ApiError(error.message, command, error.code, error.status);
        });
    }
}
