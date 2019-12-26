import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import { ApiError } from 'error';

export interface RequestConfig {
    params?: {};
    data?: {};
}

export interface RequestError {
    error?: string;
    code: string;
    message: string;
}

export class HttpClient {
    private readonly host: string;
    private readonly token: string;
    private readonly version: string;

    constructor(host: string, token: string, version: string) {
        this.host = host;
        this.token = token;
        this.version = version;
    }

    public get<R>(endpoint: string, params?: {}): Promise<R> {
        return this.request('GET', endpoint, params);
    }

    public post<R>(endpoint: string, config: RequestConfig): Promise<R> {
        return this.request('POST', endpoint, config);
    }

    public put<R>(endpoint: string, config: RequestConfig): Promise<R> {
        return this.request('PUT', endpoint, config);
    }

    public delete<R>(endpoint: string, params?: {}): Promise<R> {
        return this.request('DELETE', endpoint, params);
    }

    public patch<R>(endpoint: string, data: {}): Promise<R> {
        return this.request('PATCH', endpoint, {
            data
        });
    }

    private request<R>(method: Method, endpoint: string, config: Partial<RequestConfig> = {}): Promise<R> {
        return axios.request<R>({
            method,
            baseURL: `${this.host}/${endpoint}`,
            params: {
                access_token: this.token,
                v: this.version,
                ...config.params
            },
            data: config.data
        }).then((response: AxiosResponse<R>) => {
            return response.data;
        }).catch((error: AxiosError<RequestError>) => {
            if (error.response) {
                const { status, data } = error.response;

                throw new ApiError(status, data.code, data.message);
            }

            throw new ApiError(0, 'unknown.error', 'Unknown error');
        });
    }

}
