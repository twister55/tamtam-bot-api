import { UpdateType } from './update';

export interface Subscription {
    url: string;
    time: number;
    update_types?: UpdateType[];
    version?: string;
}
