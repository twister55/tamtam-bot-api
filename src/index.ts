import { TamTamBotAPI } from 'api';
import { HttpClient } from 'client';
import { AxiosClient } from 'axios-client';
import { ApiError } from 'error';

const HOST = process.env.TAMTAM_API_HOST || 'https://botapi.tamtam.chat';
const TOKEN = process.env.TAMTAM_API_TOKEN || '';

export * from './api';
export * from './client';
export * from './error';
export * from './types';

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
        client = httpClient || new AxiosClient();
    }

    return new TamTamBotAPI(token, host, client);
}
