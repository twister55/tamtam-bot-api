import { Keyboard } from './button';
import { UploadedInfo } from './upload';
import { User } from './user';

export type Attachment = ImageAttachment |
                         VideoAttachment |
                         AudioAttachment |
                         FileAttachment |
                         ContactAttachment |
                         StickerAttachment |
                         ShareAttachment |
                         LocationAttachment |
                         InlineKeyboardAttachment;

export type AttachmentRequest = ImageAttachmentRequest |
                                VideoAttachmentRequest |
                                AudioAttachmentRequest |
                                FileAttachmentRequest |
                                ContactAttachmentRequest |
                                ShareAttachmentRequest |
                                StickerAttachmentRequest |
                                LocationAttachmentRequest |
                                InlineKeyboardAttachmentRequest;

export const enum AttachmentType {
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    FILE = 'file',
    CONTACT = 'contact',
    STICKER = 'sticker',
    SHARE = 'share',
    LOCATION = 'location',
    INLINE_KEYBOARD = 'inline_keyboard'
}

export interface AttachmentPayload {
    url: string;
}

export interface MediaAttachmentPayload extends AttachmentPayload {
    /**
     * Use `token` in case when you are trying to reuse the same attachment in other message
     */
    token: string;
}

export interface AudioAttachment {
    type: AttachmentType.AUDIO;
    payload: AudioAttachmentRequest;
}

/**
 * Request to attach audio to message. MUST be the only attachment in message
 */
export interface AudioAttachmentRequest {
    type: AttachmentType.AUDIO;
    payload: UploadedInfo;
}

export interface ContactAttachment {
    type: AttachmentType.CONTACT;
    payload: ContactAttachmentPayload;
}

export interface ContactAttachmentPayload {
    /**
     * User info in VCF format
     */
    vcfInfo?: string;
    /**
     * User info
     */
    tamInfo?: User;
}

/**
 * Request to attach contact card to message. MUST be the only attachment in message
 */
export interface ContactAttachmentRequest {
    type: AttachmentType.CONTACT;
    payload: ContactAttachmentRequestPayload;
}

export interface ContactAttachmentRequestPayload {
    name?: string;
    contactId?: number;
    vcfInfo?: string;
    vcfPhone?: string;
}

export interface FileAttachment {
    type: AttachmentType.FILE;
    payload: MediaAttachmentPayload;
    filename: string;
    size: number;
}

export interface FileAttachmentRequest {
    type: AttachmentType.FILE;
    payload: UploadedInfo;
}

export interface InlineKeyboardAttachment {
    type: AttachmentType.INLINE_KEYBOARD;
    payload: Keyboard;
}

export interface InlineKeyboardAttachmentRequest {
    type: AttachmentType.INLINE_KEYBOARD;
    payload: Keyboard;
}

export interface LocationAttachment {
    type: AttachmentType.LOCATION;
    latitude: number;
    longitude: number;
}

export interface LocationAttachmentRequest {
    type: AttachmentType.LOCATION;
    latitude: number;
    longitude: number;
}

export interface ImageAttachment {
    type: AttachmentType.IMAGE;
    payload: ImageAttachmentPayload;
}

export interface ImageAttachmentPayload extends MediaAttachmentPayload {
    photo_id: number;
}

export interface ImageAttachmentRequest {
    type: AttachmentType.IMAGE;
    payload: ImageAttachmentRequestPayload;
}

export interface ImageAttachmentRequestPayload {
    url?: string;
    token?: string;
    photos?: {
        [key: string]: PhotoToken;
    };
}

export interface PhotoToken {
    token: string;
}

export interface ShareAttachment {
    type: AttachmentType.SHARE;
    payload: Partial<MediaAttachmentPayload>;
    title?: string;
    description?: string;
    imageUrl?: string;
}

export interface ShareAttachmentRequest {
    type: AttachmentType.SHARE;
    payload: Partial<MediaAttachmentPayload>;
}

export interface StickerAttachment {
    type: AttachmentType.STICKER;
    payload: StickerAttachmentPayload;
    width: number;
    height: number;
}

export interface StickerAttachmentPayload extends AttachmentPayload {
    code: string;
}

export interface StickerAttachmentRequest {
    type: AttachmentType.STICKER;
    payload: StickerAttachmentRequestPayload;
}

export interface StickerAttachmentRequestPayload {
    code: string;
}

export interface VideoAttachment {
    type: AttachmentType.VIDEO;
    payload: MediaAttachmentPayload;
    thumbnail?: ImageAttachmentPayload;
    width?: number;
    height?: number;
    duration?: number;
}

export interface VideoAttachmentRequest {
    type: AttachmentType.VIDEO;
    payload: UploadedInfo;
}
