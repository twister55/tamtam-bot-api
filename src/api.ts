import { ApiClient, HttpClient } from 'client';
import {
    Action,
    CallbackAnswer,
    ConstructorAnswer,
    BotInfo,
    Chat,
    ChatList,
    ChatMember,
    ChatMembersList,
    Result,
    UpdateParams,
    BotData,
    ChatData,
    UserIdsList,
    GetMessagesParams,
    SendMessageParams,
    MessageResult,
    SubscriptionsResult,
    Message,
    MessageList,
    NewMessageBody,
    Updates,
    UpdateType,
    UploadEndpoint,
    RequireAtLeastOne
} from 'types';

const VERSION = '0.2.0';

export class TamTamBotAPI {
    public readonly client: ApiClient;

    constructor(token: string, host: string, client: HttpClient) {
        this.client = new ApiClient(host, token, VERSION, client);
    }

    public getBotInfo(): Promise<BotInfo> {
        return this.client.get('me');
    }

    public setBotInfo(data: RequireAtLeastOne<BotData>): Promise<BotInfo> {
        return this.client.patch('me', data);
    }

    public getUpdates(params?: UpdateParams): Promise<Updates> {
        return this.client.get('updates', params);
    }

    public getSubscriptions(): Promise<SubscriptionsResult> {
        return this.client.get('subscriptions');
    }

    public subscribe(url: string, updateTypes?: UpdateType[], version?: string): Promise<Result> {
        return this.client.post('subscriptions', {
            data: {
                url,
                update_types: updateTypes,
                version
            }
        });
    }

    public unsubscribe(url: string): Promise<Result> {
        return this.client.delete('subscriptions', {
            params: {
                url
            }
        });
    }

    public getChats(count: number = 50, marker?: string): Promise<ChatList> {
        return this.client.get('chats', {
            count,
            marker
        });
    }

    public getChat(chatId: number): Promise<Chat> {
        return this.client.get(`chat/${chatId}`);
    }

    public editChat(chatId: number, data: RequireAtLeastOne<ChatData>): Promise<Chat> {
        return this.client.patch(`chat/${chatId}`, data);
    }

    public getChatMembership(chatId: number): Promise<ChatMember> {
        return this.client.get(`chats/${chatId}/members/me`);
    }

    public getChatMembers(chatId: number): Promise<UserIdsList> {
        return this.client.get(`chats/${chatId}/members`);
    }

    public getChatAdmins(chatId: number): Promise<ChatMembersList> {
        return this.client.get(`chats/${chatId}/members/admins`);
    }

    public addMembers(chatId: number, ids: number): Promise<Result> {
        return this.client.post(`chats/${chatId}/members`, {
            data: {
                user_ids: ids
            }
        });
    }

    public removeMember(chatId: number, userId: number, block: boolean = false): Promise<Result> {
        return this.client.delete(`chats/${chatId}/members`, {
            params: {
                user_id: userId,
                block
            }
        });
    }

    public leaveChat(chatId: number): Promise<Result> {
        return this.client.delete(`chats/${chatId}/members/me`);
    }

    public getMessages(params?: GetMessagesParams): Promise<MessageList> {
        return this.client.get('messages', params);
    }

    public getMessage(messageId: string): Promise<Message> {
        return this.client.delete(`messages/${messageId}`);
    }

    public sendAction(chatId: number, action: Action): Promise<Result> {
        return this.client.post(`chats/${chatId}/actions`, {
            data: {
                action
            }
        });
    }

    public sendMessage(params: SendMessageParams, data: NewMessageBody): Promise<MessageResult> {
        return this.client.post('messages', {
            params,
            data
        });
    }

    public editMessage(messageId: string, data: NewMessageBody): Promise<MessageResult> {
        return this.client.put('messages', {
            params: {
                message_id: messageId
            },
            data
        });
    }

    public deleteMessage(messageId: string): Promise<Result> {
        return this.client.delete('messages', {
            params: {
                message_id: messageId
            }
        });
    }

    public answerOnCallback(callbackId: string, answer: RequireAtLeastOne<CallbackAnswer>): Promise<Result> {
        return this.client.post('answers', {
            params: {
                callback_id: callbackId
            },
            data: answer
        });
    }

    public constructMessage(sessionId: string, answer: ConstructorAnswer): Promise<Result> {
        return this.client.post('answers/constructor', {
            params: {
                session_id: sessionId
            },
            data: answer
        });
    }

    public upload(type: 'image' | 'video' | 'audio' | 'file'): Promise<UploadEndpoint> {
        return this.client.post('uploads', {
            params: {
                type
            }
        });
    }

}
