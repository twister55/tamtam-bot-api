import { UpdateType } from './update';

export interface Subscription {
    url: string;
    time: number;
    update_types?: UpdateType[];
    version?: string;
}

export interface SubscriptionRequest {
    url: string;
    update_types?: UpdateType[];
    version?: string;
}

export interface GetSubscriptionsResult {
    subscriptions: Subscription[];
}
