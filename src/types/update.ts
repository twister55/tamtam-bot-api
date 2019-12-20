import { User } from './user';
import { Message, MessageLink, MessageBody } from './message';
import { NewMessageBody } from './new-message';
import { Chat } from './chat';

export type Update = MessageCreatedUpdate |
                     MessageCallbackUpdate |
                     MessageEditedUpdate |
                     MessageRemovedUpdate |
                     BotAddedToChatUpdate |
                     BotRemovedFromChatUpdate |
                     BotStartedUpdate |
                     ChatTitleChangedUpdate |
                     MessageConstructionRequestUpdate |
                     MessageConstructedUpdate |
                     MessageChatCreatedUpdate |
                     UserAddedToChatUpdate |
                     UserRemovedFromChatUpdate

export const enum UpdateType {
    MESSAGE_CREATED = 'message_created',
    MESSAGE_CALLBACK = 'message_callback',
    MESSAGE_EDITED = 'message_edited',
    MESSAGE_REMOVED = 'message_removed',
    BOT_ADDED = 'bot_added',
    BOT_REMOVED = 'bot_removed',
    BOT_STARTED = 'bot_started',
    CHAT_TITLE_CHANGED = 'chat_title_changed',
    MESSAGE_CONSTRUCTION_REQUEST = 'message_construction_request',
    MESSAGE_CONSTRUCTED = 'message_constructed',
    MESSAGE_CHAT_CREATED = 'message_chat_created',
    USER_ADDED = 'user_added',
    USER_REMOVED = 'user_removed',
}

export interface UpdateParams {
    limit?: number;
    timeout?: number;
    marker?: number;
    types?: UpdateType[]
}

export interface UpdateList {
    updates: Array<Update>;
    marker: number;
}

/**
 * You will receive this update when bot has been added to chat
 */
export interface BotAddedToChatUpdate {
    type: UpdateType.BOT_ADDED;
    chat_id: number;
    user: User;
    timestamp: number;
}

/**
 * You will receive this update when bot has been removed from chat
 */
export interface BotRemovedFromChatUpdate {
    type: UpdateType.BOT_REMOVED;
    chat_id: number;
    user: User;
    timestamp: number;
}

/**
 * Bot gets this type of update as soon as user pressed `Start` button
 */
export interface BotStartedUpdate {
    type: UpdateType.BOT_STARTED;
    chat_id: number;
    user: User;
    payload?: string;
    user_locale?: string;
    timestamp: number;
}

/**
 * Bot gets this type of update as soon as title has been changed in chat
 */
export interface ChatTitleChangedUpdate {
    type: UpdateType.CHAT_TITLE_CHANGED;
    chat_id: number;
    user: User;
    title: string;
    timestamp: number;
}

/**
 * You will get this `update` as soon as user presses button
 */
export interface MessageCallbackUpdate {
    type: UpdateType.MESSAGE_CALLBACK;
    callback: Callback;
    message?: Message;
    user_locale?: string;
    timestamp: number;
}

/**
 * Object sent to bot when user presses button
 */
export interface Callback {
    timestamp: number;
    callback_id: string;
    payload?: string;
    user: User;
}

/**
 * Bot will get this update when chat has been created as soon as first user clicked chat button
 */
export interface MessageChatCreatedUpdate {
    type: UpdateType.MESSAGE_CHAT_CREATED;
    chat: Chat;
    message_id: string;
    start_payload?: string;
    timestamp: number;
}

/**
 * Bot will get this update when constructed message has been posted to any chat
 */
export interface MessageConstructedUpdate {
    type: UpdateType.MESSAGE_CONSTRUCTED;
    session_d: string;
    message: ConstructedMessage;
    timestamp: number;
}

/**
 * Message constructed in chat
 */
export interface ConstructedMessage {
    sender: User;
    timestamp: number;
    link?: MessageLink;
    body: MessageBody;
}

/**
 * Bot will get this update when user sent to bot any message or pressed button during construction process
 */
export interface MessageConstructionRequestUpdate {
    type: UpdateType.MESSAGE_CONSTRUCTION_REQUEST;
    user: User;
    user_locale?: string;
    session_id: string;
    data?: string;
    input: ConstructorInput;
    timestamp: number;
}

/**
 * It can be either message (text/attachments) or button callback
 */
export type ConstructorInput = CallbackConstructorInput | MessageConstructorInput;

export const enum ConstructorInputType {
    CALLBACK = 'callback',
    MESSAGE = 'message'
}

/**
 * Bot will get this input as soon as soon user taps on button created by bot in construction mode
 */
export interface CallbackConstructorInput {
    input_type: ConstructorInputType.CALLBACK;
    payload: string;
}

/**
 * Bot will get this input in case when user sends message to bot manually
 *
 * Messages sent by user during construction process.
 * Typically it is single element array but sometimes it can contains multiple messages.
 * Can be empty on initial request when user just opened constructor
 */
export interface MessageConstructorInput {
    input_type: ConstructorInputType.MESSAGE;
    messages: Array<NewMessageBody>;
}


/**
 * You will get this `update` as soon as message is created
 */
export interface MessageCreatedUpdate {
    type: UpdateType.MESSAGE_CREATED;
    message: Message;
    timestamp: number;
}

/**
 * You will get this `update` as soon as message is edited
 */
export interface MessageEditedUpdate {
    type: UpdateType.MESSAGE_EDITED;
    message: Message;
    timestamp: number;
}

/**
 * You will get this `update` as soon as message is removed
 */
export interface MessageRemovedUpdate {
    type: UpdateType.MESSAGE_REMOVED;
    message_id: string;
    chat_id: number;
    user_id: number;
    timestamp: number;
}

/**
 * You will receive this update when user has been added to chat where bot is administrator
 */
export interface UserAddedToChatUpdate {
    type: UpdateType.USER_ADDED;
    chat_id: number;
    user: User;
    /**
     * Can be `null` in case when user joined chat by link
     */
    inviter_id?: number;
    timestamp: number;
}

/**
 * You will receive this update when user has been removed from chat where bot is administrator
 */
export interface UserRemovedFromChatUpdate {
    type: UpdateType.USER_REMOVED;
    chat_id: number;
    user: User;
    /**
     * Can be `null` in case when user left chat
     */
    admin_id?: number;
    timestamp: number;
}
