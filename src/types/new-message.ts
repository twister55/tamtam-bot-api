import { AttachmentRequest } from './attachment';
import { Message, MessageLinkType } from './message';

export type SendMessageParams = SendMessageToUserParams | SendMessageToChatParams;

export interface SendMessageToUserParams {
    user_id: number;
    disable_link_preview?: boolean;
}

export interface SendMessageToChatParams {
    chat_id: number;
    disable_link_preview?: boolean;
}

export interface SendMessageResult {
    message: Message;
}

export interface NewMessageBody {
    text?: string;
    attachments?: Array<AttachmentRequest>;
    link?: NewMessageLink;
    notify?: boolean;
}

export interface NewMessageLink {
    type: MessageLinkType;
    mid: string;
}
