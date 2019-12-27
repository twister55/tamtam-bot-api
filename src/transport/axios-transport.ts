import axios, { AxiosError, AxiosResponse } from 'axios';

import { Transport } from './transport';
import { Method, RequestOptions, RequestError } from './request';
import { TransportError } from './error';

export class AxiosTransport implements Transport {

    public request<R>(method: Method, url: string, options: Partial<RequestOptions> = {}): Promise<R> {
        return axios.request<R>({
            method,
            headers: options.headers,
            baseURL: url,
            params: options.params,
            data: options.data
        }).then(({ data }: AxiosResponse<R>) => {
            return data;
        }).catch(({ response }: AxiosError<RequestError>) => {
            if (response) {
                const { status, data } = response;

                throw new TransportError(data.message, data.code, status);
            }

            throw new TransportError('Unknown error', 'unknown.error');
        });
    }
}
