import { User } from './user';
import { ImageAttachmentRequestPayload } from './attachment';

export interface Chat {
    chat_id: number;
    type: ChatType;
    status: ChatStatus;
    title?: string;
    icon?: {
        url: string;
    };
    last_event_time: number;
    participants_count: number;
    /**
     * Visible only for chat admins
     */
    owner_id?: number;
    /**
     * Participants in chat with time of last activity.
     * Can be *null* when you request list of chats.
     * Visible for chat admins only
     */
    participants?: {
        [key: string]: number;
    };
    is_public: boolean;
    link?: string;
    description?: string;
    /**
     * Another user in conversation. For `dialog` type chats only
     */
    dialog_with_user?: User;
    /**
     * Messages count in chat. Only for group chats and channels. **Not available** for dialogs
     */
    messages_count?: number;
    /**
     * Identifier of message that contains `chat` button initialized chat
     */
    chat_message_id?: string;
}

export interface Dialog extends Chat {
    chat_id: number;
    type: ChatType.DIALOG;
    status: ChatStatus;
    title?: string;
    last_event_time: number;
    participants_count: 2;
    owner_id?: number;
    participants?: {
        [key: string]: number;
    };
    dialog_with_user: User;
    is_public: false;
    icon: undefined;
    link: undefined;
    description: undefined;
    messages_count: undefined;
    chat_message_id: undefined;
}

export interface ChatList {
    chats: Chat[];
    marker?: number;
}

export interface ChatPatch {
    icon?: ImageAttachmentRequestPayload;
    title?: string;
}

export const enum ChatStatus {
    /**
     * bot is active member of chat
     */
    ACTIVE = 'active',
    /**
     * bot was kicked
     */
    REMOVED = 'removed',
    /**
     * bot intentionally left chat
     */
    LEFT = 'left',
    /**
     * chat was closed
     */
    CLOSED = 'closed',
    /**
     * suspended
     */
    SUSPENDED = 'suspended'
}

export const enum ChatType {
    DIALOG = 'dialog',
    CHAT = 'chat',
    CHANNEL = 'channel'
}

export interface ChatMember extends User {
    last_access_time: number;
    is_owner: boolean;
    is_admin: boolean;
    join_time: number;
    permissions: ChatAdminPermission[] | null;
}

export const enum ChatAdminPermission {
    READ_ALL_MESSAGES = 'read_all_messages',
    ADD_REMOVE_MEMBERS = 'add_remove_members',
    ADD_ADMINS = 'add_admins',
    CHANGE_CHAT_INFO = 'change_chat_info',
    PIN_MESSAGE = 'pin_message',
    WRITE = 'write'
}

export interface ChatMembersList {
    members: ChatMember[];
    marker?: number;
}
