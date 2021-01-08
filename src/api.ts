import { ApiClient, HttpClient } from 'client';
import {
    ActionRequestBody,
    BotInfo,
    BotPatch,
    CallbackAnswer,
    Chat,
    ChatList,
    ChatMember,
    ChatMembersList,
    ChatPatch,
    ConstructorAnswer,
    GetPinnedMessageResult,
    GetSubscriptionsResult,
    Message,
    MessageList,
    NewMessageBody,
    PinMessageBody,
    SendMessageResult,
    SimpleQueryResult,
    SubscriptionRequestBody,
    UpdateList,
    UploadEndpoint,
    UploadType,
    UserIdsList
} from 'types';

/**
 * TamTam Bot API
 *
 * @see https://dev.tamtam.chat
 * @version 0.3.0
 */
export class TamTamBotAPI {
    public readonly client: ApiClient;

    constructor(token: string, host: string, client: HttpClient) {
        this.client = new ApiClient(host, token, '0.3.0', client);
    }

    /**
     * Edits current bot info
     * Fill only the fields you want to update
     * All remaining fields will stay untouched
     *
     * @summary Edit current bot info
     */
    public editMyInfo(data: BotPatch): Promise<BotInfo> {
        return this.client.request('PATCH', '/me', {
            data
        });
    }

    /**
     * Returns info about current bot
     * Current bot can be identified by access token
     * Method returns bot identifier, name and avatar (if any)
     *
     * @summary Get current bot info
     */
    public getMyInfo(): Promise<BotInfo> {
        return this.client.request('GET', '/me');
    }

    /**
     * Adds members to chat
     * Additional permissions may require
     *
     * @summary Add members
     */
    public addMembers(chatId: number, data: UserIdsList): Promise<SimpleQueryResult> {
        return this.client.request('POST', `/chats/${chatId}/members`, {
            data
        });
    }

    /**
     * Edits chat info: title, icon, etc…
     *
     * @summary Edit chat info
     */
    public editChat(chatId: number, data: ChatPatch): Promise<Chat> {
        return this.client.request('PATCH', `/chats/${chatId}`, {
            data
        });
    }

    /**
     * Returns all chat administrators
     * Bot must be **administrator** in requested chat
     *
     * @summary Get chat admins
     */
    public getAdmins(chatId: number): Promise<ChatMembersList> {
        return this.client.request('GET', `/chats/${chatId}/members/admins`);
    }

    /**
     * Returns info about chat
     *
     * @summary Get chat
     */
    public getChat(chatId: number): Promise<Chat> {
        return this.client.request('GET', `/chats/${chatId}`);
    }

    /**
     * Returns chat/channel information by its public link or dialog with user by username
     *
     * @summary Get chat by link
     */
    public getChatByLink(chatLink: string): Promise<Chat> {
        return this.client.request('GET', `/chats/${chatLink}`);
    }

    /**
     * Returns information about chats that bot participated in: a result list and marker points to the next page
     *
     * @summary Get all chats
     */
    public getChats(params?: { count?: number; marker?: number }): Promise<ChatList> {
        return this.client.request('GET', '/chats', {
            params
        });
    }

    /**
     * Returns users participated in chat
     *
     * @summary Get members
     */
    public getMembers(chatId: number, params?: { user_ids?: number[]; marker?: number; count?: number }): Promise<ChatMembersList> {
        return this.client.request('GET', `/chats/${chatId}/members`, {
            params
        });
    }

    /**
     * Returns chat membership info for current bot
     *
     * @summary Get chat membership
     */
    public getMembership(chatId: number): Promise<ChatMember> {
        return this.client.request('GET', `/chats/${chatId}/members/me`);
    }

    /**
     * Get pinned message in chat or channel
     *
     * @summary Get pinned message
     */
    public getPinnedMessage(chatId: number): Promise<GetPinnedMessageResult> {
        return this.client.request('GET', `/chats/${chatId}/pin`);
    }

    /**
     * Removes bot from chat members
     *
     * @summary Leave chat
     */
    public leaveChat(chatId: number): Promise<SimpleQueryResult> {
        return this.client.request('DELETE', `/chats/${chatId}/members/me`);
    }

    /**
     * Pins message in chat or channel
     *
     * @summary Pin message
     */
    public pinMessage(chatId: number, data: PinMessageBody): Promise<SimpleQueryResult> {
        return this.client.request('PUT', `/chats/${chatId}/pin`, {
            data
        });
    }

    /**
     * Removes member from chat
     * Additional permissions may require
     *
     * @summary Remove member
     */
    public removeMember(chatId: number, userId: number, block?: boolean): Promise<SimpleQueryResult> {
        return this.client.request('DELETE', `/chats/${chatId}/members`, {
            params: {
                user_id: userId,
                block
            }
        });
    }

    /**
     * Send bot action to chat
     *
     * @summary Send action
     */
    public sendAction(chatId: number, data: ActionRequestBody): Promise<SimpleQueryResult> {
        return this.client.request('POST', `/chats/${chatId}/actions`, {
            data
        });
    }

    /**
     * Unpins message in chat or channel
     *
     * @summary Unpin message
     */
    public unpinMessage(chatId: number): Promise<SimpleQueryResult> {
        return this.client.request('DELETE', `/chats/${chatId}/pin`);
    }

    /**
     * This method should be called to send an answer after a user has clicked the button
     * The answer may be an updated message or/and a one-time user notification
     *
     * @summary Answer on callback
     */
    public answerOnCallback(callbackId: string, data: CallbackAnswer): Promise<SimpleQueryResult> {
        return this.client.request('POST', '/answers', {
            data,
            params: {
                callback_id: callbackId
            }
        });
    }

    /**
     * Sends answer on construction request
     * Answer can contain any prepared message and/or keyboard to help user interact with bot
     *
     * @summary Construct message
     */
    public construct(sessionId: string, data: ConstructorAnswer): Promise<SimpleQueryResult> {
        return this.client.request('POST', '/answers/constructor', {
            data,
            params: {
                session_id: sessionId
            }
        });
    }

    /**
     * Deletes message in a dialog or in a chat if bot has permission to delete messages
     *
     * @summary Delete message
     */
    public deleteMessage(messageId: string): Promise<SimpleQueryResult> {
        return this.client.request('DELETE', '/messages', {
            params: {
                message_id: messageId
            }
        });
    }

    /**
     * Updated message should be sent as `NewMessageBody` in a request body
     * In case `attachments` field is `null`, the current message attachments won’t be changed
     * In case of sending an empty list in this field, all attachments will be deleted
     *
     * @summary Edit message
     */
    public editMessage(messageId: string, data: NewMessageBody): Promise<SimpleQueryResult> {
        return this.client.request('PUT', '/messages', {
            data,
            params: {
                message_id: messageId
            }
        });
    }

    /**
     * Returns single message by its identifier
     *
     * @summary Get message
     */
    public getMessageById(messageId: string): Promise<Message> {
        return this.client.request('GET', `/messages/${messageId}`);
    }

    /**
     * Returns messages in chat: result page and marker referencing to the next page
     * Messages traversed in reverse direction so the latest message in chat will be first in result array
     * Therefore if you use `from` and `to` parameters, `to` must be **less than** `from`
     *
     * @summary Get messages
     */
    public getMessages(params: { chat_id?: number; message_ids?: string[]; from?: number; to?: number; count?: number }): Promise<MessageList> {
        return this.client.request('GET', '/messages', {
            params
        });
    }

    /**
     * Sends a message to a chat
     * As a result for this method new message identifier returns
     * ### Attaching media
     * Attaching media to messages is a three-step process
     *
     * At first step, you should [getUploadUrl]{@link TamTamBotAPI#getUploadUrl} your media files
     *
     * At the second, you should upload binary of appropriate format to URL you obtained at the previous step
     * See [upload](https://dev.tamtam.chat/#operation/getUploadUrl) section for details
     *
     * Finally, if the upload process was successful, you will receive JSON-object in a response body
     *  Use this object to create attachment
     * Construct an object with two properties:
     * - `type` with the value set to appropriate media type
     * - and `payload` filled with the JSON you've got
     *
     * For example, you can attach a video to message this way:
     *
     * 1. Get URL to upload. Execute following:
     * ```shell
     * curl -X POST 'https://botapi.tamtam.chat/uploads?access_token=%access_token%&type=video'
     * ```
     * As the result it will return URL for the next step
     * ```json
     * {
     *     "url": "http://vu.mycdn.me/upload.do…"
     * }
     * ```
     *
     * 2. Use this url to upload your binary:
     * ```shell
     * curl -i -X POST
     *   -H "Content-Type: multipart/form-data"
     *   -F "data=@movie.mp4" "http://vu.mycdn.me/upload.do…"
     * ```
     * As the result it will return JSON you can attach to message:
     * ```json
     *   {
     *     "token": "_3Rarhcf1PtlMXy8jpgie8Ai_KARnVFYNQTtmIRWNh4"
     *   }
     * ```
     * 3. Send message with attach:
     * ```json
     * {
     *     "text": "Message with video",
     *     "attachments": [
     *         {
     *             "type": "video",
     *             "payload": {
     *                 "token": "_3Rarhcf1PtlMXy8jpgie8Ai_KARnVFYNQTtmIRWNh4"
     *             }
     *         }
     *     ]
     * }
     * ```
     *
     * **Important notice**:
     *
     * It may take time for the server to process your file (audio/video or any binary)
     * While a file is not processed you can't attach it
     * It means the last step will fail with `400` error
     * Try to send a message again until you'll get a successful result
     *
     * @summary Send message
     */
    public sendMessage(data: NewMessageBody, params: { user_id?: number; chat_id?: number; disable_link_preview?: boolean }): Promise<SendMessageResult> {
        return this.client.request('POST', '/messages', {
            data,
            params
        });
    }

    /**
     * In case your bot gets data via WebHook, the method returns list of all subscriptions
     *
     * @summary Get subscriptions
     */
    public getSubscriptions(): Promise<GetSubscriptionsResult> {
        return this.client.request('GET', '/subscriptions');
    }

    /**
     * You can use this method for getting updates in case your bot is not subscribed to WebHook
     * The method is based on long polling
     *
     * Every update has its own sequence number
     * `marker` property in response points to the next upcoming update
     *
     * All previous updates are considered as *committed* after passing `marker` parameter
     * If `marker` parameter is **not passed**, your bot will get all updates happened after the last commitment
     *
     * @summary Get updates
     */
    public getUpdates(params?: { limit?: number; timeout?: number; marker?: number; types?: string[] }): Promise<UpdateList> {
        return this.client.request('GET', '/updates', {
            params
        });
    }

    /**
     * Subscribes bot to receive updates via WebHook
     * After calling this method, the bot will receive notifications about new events in chat rooms at the specified URL
     *
     * Your server **must** be listening on one of the following ports: **80, 8080, 443, 8443, 16384-32383**
     *
     * @summary Subscribe
     */
    public subscribe(data: SubscriptionRequestBody): Promise<SimpleQueryResult> {
        return this.client.request('POST', '/subscriptions', {
            data
        });
    }

    /**
     * Unsubscribes bot from receiving updates via WebHook
     * After calling the method, the bot stops receiving notifications about new events
     * Notification via the long-poll API becomes available for the bot
     *
     * @summary Unsubscribe
     */
    public unsubscribe(url: string): Promise<SimpleQueryResult> {
        return this.client.request('DELETE', '/subscriptions', {
            params: {
                url
            }
        });
    }

    /**
     * Returns the URL for the subsequent file upload
     *
     * For example, you can upload it via curl:
     *
     * ```curl -i -X POST
     *   -H "Content-Type: multipart/form-data"
     *   -F "data=@movie.mp4" "%UPLOAD_URL%"```
     *
     * Two types of an upload are supported:
     * - single request upload (multipart request)
     * - and resumable upload
     *
     * ##### Multipart upload
     * This type of upload is a simpler one but it is less
     * reliable and agile
     * If a `Content-Type`: multipart/form-data header is passed in a request our service indicates
     * upload type as a simple single request upload
     *
     * This type of an upload has some restrictions:
     *
     * - Max
     * file size - 2 Gb
     * - Only one file per request can be uploaded
     * - No possibility to restart stopped / failed upload
     *
     * ##### Resumable upload
     * If `Content-Type` header value is not equal to `multipart/form-data` our service indicated upload type
     * as a resumable upload
     * With a `Content-Range` header current file chunk range and complete file size
     * can be passed
     * If a network error has happened or upload was stopped you can continue to upload a file from
     * the last successfully uploaded file chunk
     * You can request the last known byte of uploaded file from server
     * and continue to upload a file
     *
     * ##### Get upload status
     * To GET an upload status you simply need to perform HTTP-GET request to a file upload URL
     * Our service will respond with current upload status,
     * complete file size and last known uploaded byte
     * This data can be used to complete stopped upload
     * if something went wrong
     * If `REQUESTED_RANGE_NOT_SATISFIABLE` or `INTERNAL_SERVER_ERROR` status was returned
     * it is a good point to try to restart an upload
     *
     * @summary Get upload URL
     */
    public getUploadUrl(type: UploadType): Promise<UploadEndpoint> {
        return this.client.request('POST', '/uploads', {
            params: {
                type
            }
        });
    }
}
