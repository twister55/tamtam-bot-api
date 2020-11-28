import { ImageAttachmentRequestPayload } from './attachment';
import { BotCommand } from './bot-info';
import { Message } from './message';
import { Subscription } from './subscription';
import { UpdateType } from './update';

export interface RequestError {
    /**
     * Error
     */
    error?: string;
    /**
     * Error code
     */
    code: string;
    /**
     * Human-readable description
     */
    message: string;
}

export interface Result {
    success: boolean;
    /**
     * Explanatory message if the result is not successful
     */
    message?: string;
}

export interface UpdateParams {
    limit?: number;
    timeout?: number;
    marker?: number;
    types?: UpdateType[];
}

export interface BotData {
    name?: string;
    username?: string;
    description?: string;
    commands?: BotCommand[];
    photo?: ImageAttachmentRequestPayload;
}

export interface ChatData {
    icon?: ImageAttachmentRequestPayload;
    title?: string;
}

export interface UserIdsList {
    user_ids: number[];
}

export interface GetMessagesParams {
    chat_id?: number;
    message_ids?: string[];
    from?: number;
    to?: number;
    count?: number;
}

export type SendMessageParams = SendMessageToUserParams | SendMessageToChatParams;

export interface SendMessageToUserParams {
    user_id: number;
    disable_link_preview?: boolean;
}

export interface SendMessageToChatParams {
    chat_id: number;
    disable_link_preview?: boolean;
}

export interface MessageResult {
    message: Message;
}

export interface SubscriptionsResult {
    subscriptions: Subscription[];
}
