import { NewMessageBody } from './new-message';
import { Keyboard } from './button';

/**
 * Send this object when your bot wants to react to when a button is pressed
 */
export type CallbackAnswer = CallbackMessageAnswer | CallbackNotificationResult;

/**
 * Fill this if you want to modify current message
 */
export interface CallbackMessageAnswer {
    message: NewMessageBody;
}

/**
 * Fill this if you just want to send one-time notification to user
 */
export interface CallbackNotificationResult {
    notification: string;
}

/**
 * Bot's answer on construction request
 */
export interface ConstructorAnswer {
    /**
     * Array of prepared messages. This messages will be sent as user taps on \"Send\" button
     */
    messages?: Array<NewMessageBody>;
    /**
     * If `true` user can send any input manually. Otherwise, only keyboard will be shown
     */
    allow_user_input?: boolean;
    /**
     * Hint to user. Will be shown on top of keyboard
     */
    hint?: string;
    /**
     * In this property you can store any additional data up to 8KB. We send this data back to bot within the next construction request. It is handy to store here any state of construction session
     */
    data?: string;
    /**
     * Keyboard to show to user in constructor mode
     */
    keyboard?: Keyboard;
    /**
     * Text to show over the text field
     */
    placeholder?: string;
}
