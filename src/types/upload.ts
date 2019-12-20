import { PhotoToken } from './attachment';

/**
 * Endpoint you should upload to your binaries
 */
export interface UploadEndpoint {
    url: string;
}

export const enum UploadType {
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    FILE = 'file'
}

/**
 * This is information you will receive as soon as audio/video is uploaded
 */
export interface UploadedInfo {
    /**
     * Token is unique uploaded media identifier
     */
    token?: string;
}

/**
 * This is information you will receive as soon as an image uploaded
 */
export interface PhotoTokens {
    photos: {
        [key: string]: PhotoToken;
    };
}
