
export type Button = CallbackButton | LinkButton | RequestContactButton | RequestGeoLocationButton | ChatButton;

export interface Keyboard {
    buttons: Array<Array<Button>>;
}

export const enum ButtonType {
    CALLBACK = 'callback',
    LINK = 'link',
    REQUEST_CONTACT = 'request_contact',
    REQUEST_GEO_LOCATION = 'request_geo_location',
    CHAT = 'chat'
}

/**
 * After pressing this type of button client sends to server payload it contains
 */
export interface CallbackButton {
    type: ButtonType.CALLBACK;
    text: string;
    payload: string;
    intent?: Intent;
}

export const enum Intent {
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
    DEFAULT = 'default'
}

/**
 * Button that creates new chat as soon as the first user clicked on it.
 * Bot will be added to chat participants as administrator.
 * Message author will be owner of the chat.
 */
export interface ChatButton {
    type: ButtonType.CHAT;
    text: string;
    chat_title?: string;
    chat_description?: string;
    start_payload?: string;
    uuid?: number;
}

/**
 * After pressing this type of button user follows the link it contains
 */
export interface LinkButton {
    type: ButtonType.LINK;
    text: string;
    url: string;
}

export interface RequestContactButton {
    type: ButtonType.REQUEST_CONTACT;
    text: string;
}

/**
 * After pressing this type of button client sends new message with attachment of current user geo location
 */
export interface RequestGeoLocationButton {
    type: ButtonType.REQUEST_GEO_LOCATION;
    text: string;
    /**
     * If *true*, sends location without asking user\'s confirmation
     */
    quick?: boolean;
}
