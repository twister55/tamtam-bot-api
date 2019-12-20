
export interface User {
    user_id: number;
    name: string;
    username?: string;
    avatar_url?: string;
    full_avatar_url?: string;
}

export interface UserIdsList {
    user_ids: Array<number>;
}
