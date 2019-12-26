import { User } from './user';
import { ImageAttachmentRequestPayload } from './attachment';

export interface BotInfo extends User {
    commands?: BotCommand[];
    description?: string;
}

export interface BotPatch {
    name?: string;
    username?: string;
    description?: string;
    commands?: BotCommand[];
    photo?: ImageAttachmentRequestPayload;
}

export interface BotCommand {
    name: string;
    description?: string;
}
