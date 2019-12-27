import { AttachmentRequest } from './attachment';
import { MessageLinkType } from './message';

export interface NewMessageBody {
    text?: string;
    attachments?: AttachmentRequest[];
    link?: NewMessageLink;
    notify?: boolean;
}

export interface NewMessageLink {
    type: MessageLinkType;
    mid: string;
}
