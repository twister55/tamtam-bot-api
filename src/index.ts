import { TamTamBotAPI } from 'api';
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { HttpClient, Method, RequestOptions } from 'client';
import { ApiError } from 'error';
import { RequestError } from 'types';

const HOST = process.env.TAMTAM_API_HOST || 'https://botapi.tamtam.chat';
const TOKEN = process.env.TAMTAM_API_TOKEN || '';
const HTTP_CLIENT = {
    request: <R>(method: Method, baseURL: string, { headers, params, data }: Partial<RequestOptions> = {}): Promise<R> => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const axios: AxiosInstance = require('axios');

        return axios
            .request<R>({ method, baseURL, headers, params, data })
            .then((res: AxiosResponse<R>) => res.data)
            .catch((error: AxiosError<RequestError>) => {
                if (error.response) {
                    const {
                        status,
                        data: { message, code }
                    } = error.response;

                    throw new ApiError(message, baseURL, code, status);
                }

                throw error;
            });
    }
};

export * from 'api';
export * from 'client';
export * from 'error';
export * from 'types';

export function createAPI(token: string): TamTamBotAPI;
export function createAPI(token: string, host?: string): TamTamBotAPI;
export function createAPI(token: string, client?: HttpClient): TamTamBotAPI;
export function createAPI(token: string, host?: string, client?: HttpClient): TamTamBotAPI;
export function createAPI(token: string = TOKEN, hostOrClient: string | HttpClient = HOST, httpClient?: HttpClient): TamTamBotAPI {
    if (!token) {
        throw new ApiError('Access token required', 'init', 'token.error');
    }

    let host;
    let client;

    if (typeof hostOrClient === 'object') {
        client = hostOrClient;
        host = HOST;
    } else {
        host = hostOrClient;
        client = httpClient || HTTP_CLIENT;
    }

    return new TamTamBotAPI(token, host, client);
}
