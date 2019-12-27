import { Method, RequestOptions } from './request';

export interface Transport {
    request<R>(method: Method, url: string, options: Partial<RequestOptions>): Promise<R>;
}
