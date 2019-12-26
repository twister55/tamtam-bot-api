import { User } from './user';
import { ChatType } from './chat';
import { Attachment } from './attachment';

export interface Message {
    sender?: User;
    recipient: Recipient;
    timestamp: number;
    link?: MessageLink;
    body?: MessageBody;
    stat?: MessageStat;
    url?: string;
    constructor?: User;
}

export interface GetMessagesParams {
    chat_id?: number;
    message_ids?: string[];
    from?: number;
    to?: number;
    count?: number;
}

export interface MessageList {
    messages: Message[];
}

export type Recipient = UserRecipient | ChatRecipient;

export interface UserRecipient {
    chat_type: ChatType.DIALOG;
    user_id: number;
}

export interface ChatRecipient {
    chat_type: ChatType.CHAT | ChatType.CHANNEL;
    chat_id: number;
}

export type MessageLink = ForwardMessageLink | ReplyMessageLink;

export interface ForwardMessageLink {
    type: MessageLinkType.FORWARD;
    sender?: User;
    chatId: number;
    message: MessageBody;
}

export interface ReplyMessageLink {
    type: MessageLinkType.REPLY;
    sender?: User;
    message: MessageBody;
}

export const enum MessageLinkType {
    FORWARD = 'forward',
    REPLY = 'reply'
}

export interface MessageStat {
    views: number;
}

export interface MessageBody {
    /**
     * Unique identifier of message
     */
    mid: string;
    /**
     * Sequence identifier of message in chat
     */
    seq: number;
    /**
     * Message text
     */
    text?: string;
    /**
     * Message attachments. Could be one of `Attachment` type. See description of this schema
     */
    attachments?: Attachment[];
}
