export type Method = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export interface RequestHeaders {
    [key: string]: string;
}

export interface RequestParams {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface RequestOptions {
    headers?: RequestHeaders;
    params?: RequestParams;
    data?: RequestParams | FormData;
}

export interface HttpClient {
    request<R>(method: Method, url: string, options: Partial<RequestOptions>): Promise<R>;
}

export class ApiClient implements HttpClient {
    public readonly host: string;
    public readonly token: string;
    public readonly version: string;
    public readonly http: HttpClient;

    constructor(host: string, token: string, version: string, http: HttpClient) {
        this.host = host.charAt(host.length - 1) === '/' ? host : host + '/';
        this.token = token;
        this.version = version;
        this.http = http;
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

    public patch<R>(command: string, data: RequestParams): Promise<R> {
        return this.request('PATCH', command, {
            data
        });
    }

    public request<R>(method: Method, uri: string, options?: Partial<RequestOptions>): Promise<R> {
        options = options || {};
        options.params = options.params || {};
        options.params.access_token = this.token;
        options.params.v = this.version;

        return this.http.request<R>(method, this.host + uri, options);
    }
}
