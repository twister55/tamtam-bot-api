import axios, { AxiosError, AxiosResponse } from 'axios';

import { HttpClient, Method, RequestOptions, RequestError } from 'client';
import { ApiError } from 'error';

export class AxiosClient implements HttpClient {
    public request<R>(method: Method, baseURL: string, { headers, params, data }: Partial<RequestOptions> = {}): Promise<R> {
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
}
