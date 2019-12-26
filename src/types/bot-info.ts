import { User } from './user';

export interface BotInfo extends User {
    commands?: BotCommand[];
    description?: string;
}

export interface BotCommand {
    name: string;
    description?: string;
}
