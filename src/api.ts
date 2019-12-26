import { HttpClient } from 'http-client';
import { Action } from 'types/action';
import { CallbackAnswer, ConstructorAnswer } from 'types/answer';
import { BotInfo, BotPatch } from 'types/bot-info';
import { Chat, ChatList, ChatMember, ChatMembersList, ChatPatch } from 'types/chat';
import { GetMessagesParams, Message, MessageList } from 'types/message';
import { SendMessageParams, SendMessageResult, NewMessageBody } from 'types/new-message';
import { Result } from 'types/result';
import { GetSubscriptionsResult, SubscriptionRequest } from 'types/subscription';
import { UpdateList, UpdateParams } from 'types/update';
import { UserIdsList } from 'types/user';
import { UploadEndpoint, UploadType } from 'types/upload';

const HOST = 'https://botapi.tamtam.chat';
const VERSION = '0.2.0';

export class TamTamBotAPI {
    private readonly client: HttpClient;

    public static create(token: string) {
        return new TamTamBotAPI(token);
    }

    private constructor(token: string) {
        this.client = new HttpClient(HOST, token, VERSION);
    }

    public getBotInfo(): Promise<BotInfo> {
        return this.client.get('me');
    }

    public setBotInfo(patch: BotPatch): Promise<BotInfo> {
        return this.client.patch('me', patch);
    }

    public getUpdates(params?: UpdateParams): Promise<UpdateList> {
        return this.client.get('updates', params);
    }

    public getSubscriptions(): Promise<GetSubscriptionsResult> {
        return this.client.get('subscriptions');
    }

    public subscribe(data: SubscriptionRequest): Promise<Result> {
        return this.client.post('subscriptions', {
            data
        });
    }

    public unsubscribe(url: string): Promise<Result> {
        return this.client.delete('subscriptions', {
            url
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

    public editChat(chatId: number, patch: ChatPatch): Promise<Chat> {
        return this.client.patch(`chat/${chatId}`, patch);
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

    public removeMember(chatId: number, userId: number, block: boolean): Promise<Result> {
        return this.client.delete(`chats/${chatId}/members`, {
            user_id: userId,
            block
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

    public sendMessage(params: SendMessageParams, data: NewMessageBody): Promise<Message> {
        return this.client.post<SendMessageResult>('messages', {
            params,
            data
        }).then(result => {
            return result.message;
        });
    }

    public sendMessageToUser(userId: number, data: NewMessageBody, disableLinkPreview?: boolean): Promise<Message> {
        return this.sendMessage({
            user_id: userId,
            disable_link_preview: disableLinkPreview
        }, data);
    }

    public sendMessageToChat(chatId: number, data: NewMessageBody, disableLinkPreview?: boolean): Promise<Message> {
        return this.sendMessage({
            chat_id: chatId,
            disable_link_preview: disableLinkPreview
        }, data);
    }

    public editMessage(messageId: string, data: NewMessageBody): Promise<SendMessageResult> {
        return this.client.put('messages', {
            params: {
                message_id: messageId
            },
            data
        });
    }

    public deleteMessage(messageId: string): Promise<Result> {
        return this.client.delete('messages', {
            message_id: messageId
        });
    }

    public answerOnCallback(callbackId: string, answer: CallbackAnswer): Promise<Result> {
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

    public upload(type: UploadType): Promise<UploadEndpoint> {
        return this.client.post('uploads', {
            params: {
                type
            }
        });
    }

}
