export interface ActionRequestBody {
    action: SenderAction;
}

/**
 * Generic schema representing message attachment
 */
export type Attachment = PhotoAttachment | VideoAttachment | AudioAttachment | FileAttachment | StickerAttachment | ContactAttachment | InlineKeyboardAttachment | ShareAttachment | LocationAttachment;

export interface AttachmentPayload {
    /**
     * Media attachment URL
     */
    url: string;
}

/**
 * Request to attach some data to message
 */
export type AttachmentRequest =
    | PhotoAttachmentRequest
    | VideoAttachmentRequest
    | AudioAttachmentRequest
    | FileAttachmentRequest
    | StickerAttachmentRequest
    | ContactAttachmentRequest
    | InlineKeyboardAttachmentRequest
    | LocationAttachmentRequest
    | ShareAttachmentRequest;

export interface AudioAttachment {
    type: 'audio';

    payload: MediaAttachmentPayload;
}

/**
 * Request to attach audio to message
 * MUST be the only attachment in message
 */
export interface AudioAttachmentRequest {
    type: 'audio';

    payload: UploadedInfo;
}

/**
 * You will receive this update when bot has been added to chat
 */
export interface BotAddedToChatUpdate {
    update_type: 'bot_added';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Chat id where bot was added
     */
    chat_id: number;
    /**
     * User who added bot to chat
     */
    user: User;
    /**
     * Indicates whether bot has been added to channel or not
     */
    is_channel: boolean;
}

export interface BotCommand {
    /**
     * Command name
     */
    name: string;
    /**
     * Optional command description
     */
    description?: string | null;
}

export interface BotInfo {
    /**
     * Users identifier
     */
    user_id: number;
    /**
     * Users visible name
     */
    name: string;
    /**
     * Unique public user name
     * Can be `null` if user is not accessible or it is not set
     */
    username?: string | null;
    /**
     * `true` if user is bot
     */
    is_bot: boolean;
    /**
     * Time of last user activity in TamTam (Unix timestamp in milliseconds)
     * Can be outdated if user disabled its "online" status in settings
     */
    last_activity_time: number;
    /**
     * User description
     * Can be `null` if user did not fill it out
     */
    description?: string | null;
    /**
     * URL of avatar
     */
    avatar_url?: string;
    /**
     * URL of avatar of a bigger size
     */
    full_avatar_url?: string;
    /**
     * Commands supported by bot
     */
    commands?: BotCommand[] | null;
}

export interface BotPatch {
    /**
     * Visible name of bot
     */
    name?: string | null;
    /**
     * Bot unique identifier
     * It can be any string 4-64 characters long containing any digit, letter or special symbols: "-" or "_"
     * It **must** starts with a letter
     */
    username?: string | null;
    /**
     * Bot description up to 16k characters long
     */
    description?: string | null;
    /**
     * Commands supported by bot
     * Pass empty list if you want to remove commands
     */
    commands?: BotCommand[] | null;
    /**
     * Request to set bot photo
     */
    photo?: PhotoAttachmentRequestPayload | null;
}

/**
 * You will receive this update when bot has been removed from chat
 */
export interface BotRemovedFromChatUpdate {
    update_type: 'bot_removed';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Chat identifier bot removed from
     */
    chat_id: number;
    /**
     * User who removed bot from chat
     */
    user: User;
    /**
     * Indicates whether bot has been removed from channel or not
     */
    is_channel: boolean;
}

/**
 * Bot gets this type of update as soon as user pressed `Start` button
 */
export interface BotStartedUpdate {
    update_type: 'bot_started';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Dialog identifier where event has occurred
     */
    chat_id: number;
    /**
     * User pressed the 'Start' button
     */
    user: User;
    /**
     * Additional data from deep-link passed on bot startup
     */
    payload?: string | null;
    /**
     * Current user locale in IETF BCP 47 format
     */
    user_locale?: string;
}

export type Button = CallbackButton | LinkButton | RequestGeoLocationButton | RequestContactButton | ChatButton;

/**
 * Object sent to bot when user presses button
 */
export interface Callback {
    /**
     * Unix-time when user pressed the button
     */
    timestamp: number;
    /**
     * Current keyboard identifier
     */
    callback_id: string;
    /**
     * Button payload
     */
    payload?: string;
    /**
     * User pressed the button
     */
    user: User;
}

/**
 * Send this object when your bot wants to react to when a button is pressed
 */
export interface CallbackAnswer {
    /**
     * Fill this if you want to modify current message
     */
    message?: NewMessageBody | null;
    /**
     * Fill this if you just want to send one-time notification to user
     */
    notification?: string | null;
}

/**
 * After pressing this type of button client sends to server payload it contains
 */
export interface CallbackButton {
    type: 'callback';
    /**
     * Visible text of button
     */
    text: string;
    /**
     * Button payload
     */
    payload: string;
    /**
     * Intent of button
     * Affects clients representation
     */
    intent?: Intent;
}

/**
 * Bot will get this input as soon as soon user taps on button created by bot in construction mode
 */
export interface CallbackConstructorInput {
    input_type: 'callback';
    /**
     * Pressed button payload
     */
    payload: string;
}

export interface Chat {
    /**
     * Chats identifier
     */
    chat_id: number;
    /**
     * Type of chat
     * One of: dialog, chat, channel
     */
    type: ChatType;
    /**
     * Chat status
     * One of:
     *  - active: bot is active member of chat
     *  - removed: bot was kicked
     *  - left: bot intentionally left chat
     *  - closed: chat was closed
     *  - suspended: bot was stopped by user. *Only for dialogs*
     */
    status: ChatStatus;
    /**
     * Visible title of chat
     * Can be null for dialogs
     */
    title?: string | null;
    /**
     * Icon of chat
     */
    icon?: Image | null;
    /**
     * Time of last event occurred in chat
     */
    last_event_time: number;
    /**
     * Number of people in chat
     * Always 2 for `dialog` chat type
     */
    participants_count: number;
    /**
     * Identifier of chat owner
     * Visible only for chat admins
     */
    owner_id?: number | null;
    /**
     * Participants in chat with time of last activity
     * Can be *null* when you request list of chats
     * Visible for chat admins only
     */
    participants?: { [key: string]: number } | null;
    /**
     * Is current chat publicly available
     * Always `false` for dialogs
     */
    is_public: boolean;
    /**
     * Link on chat
     */
    link?: string | null;
    /**
     * Chat description
     */
    description?: string | null;
    /**
     * Another user in conversation
     * For `dialog` type chats only
     */
    dialog_with_user?: UserWithPhoto | null;
    /**
     * Messages count in chat
     * Only for group chats and channels
     * **Not available** for dialogs
     */
    messages_count?: number | null;
    /**
     * Identifier of message that contains `chat` button initialized chat
     */
    chat_message_id?: string | null;
    /**
     * Pinned message in chat or channel
     * Returned only when single chat is requested
     */
    pinned_message?: Message | null;
}

/**
 * Chat admin permissions
 */
export const enum ChatAdminPermission {
    READ_ALL_MESSAGES = 'read_all_messages',
    ADD_REMOVE_MEMBERS = 'add_remove_members',
    ADD_ADMINS = 'add_admins',
    CHANGE_CHAT_INFO = 'change_chat_info',
    PIN_MESSAGE = 'pin_message',
    WRITE = 'write'
}

/**
 * Button that creates new chat as soon as the first user clicked on it
 * Bot will be added to chat participants as administrator
 * Message author will be owner of the chat
 */
export interface ChatButton {
    type: 'chat';
    /**
     * Visible text of button
     */
    text: string;
    /**
     * Title of chat to be created
     */
    chat_title: string;
    /**
     * Chat description
     */
    chat_description?: string | null;
    /**
     * Start payload will be sent to bot as soon as chat created
     */
    start_payload?: string | null;
    /**
     * Unique button identifier across all chat buttons in keyboard
     * If `uuid` changed, new chat will be created on the next click
     * Server will generate it at the time when button initially posted
     * Reuse it when you edit the message.'
     */
    uuid?: number | null;
}

export interface ChatList {
    /**
     * List of requested chats
     */
    chats: Chat[];
    /**
     * Reference to the next page of requested chats
     */
    marker?: number | null;
}

export interface ChatMember {
    /**
     * Users identifier
     */
    user_id: number;
    /**
     * Users visible name
     */
    name: string;
    /**
     * Unique public user name
     * Can be `null` if user is not accessible or it is not set
     */
    username?: string | null;
    /**
     * `true` if user is bot
     */
    is_bot: boolean;
    /**
     * Time of last user activity in TamTam (Unix timestamp in milliseconds)
     * Can be outdated if user disabled its "online" status in settings
     */
    last_activity_time: number;
    /**
     * User description
     * Can be `null` if user did not fill it out
     */
    description?: string | null;
    /**
     * URL of avatar
     */
    avatar_url?: string;
    /**
     * URL of avatar of a bigger size
     */
    full_avatar_url?: string;
    /**
     * User last activity time in chat
     * Can be outdated for super chats and channels (equals to `join_time`)
     */
    last_access_time: number;

    is_owner: boolean;

    is_admin: boolean;

    join_time: number;
    /**
     * Permissions in chat if member is admin
     * `null` otherwise
     */
    permissions?: ChatAdminPermission[] | null;
}

export interface ChatMembersList {
    /**
     * Participants in chat with time of last activity
     * Visible only for chat admins
     */
    members: ChatMember[];
    /**
     * Pointer to the next data page
     */
    marker?: number | null;
}

export interface ChatPatch {
    icon?: PhotoAttachmentRequestPayload | null;

    title?: string | null;
    /**
     * Identifier of message to be pinned in chat
     * In case you want to remove pin, use [unpinMessage]{@link TamTamBotAPI#unpinMessage} method
     */
    pin?: string | null;
    /**
     * By default, participants will be notified about change with system message in chat/channel
     */
    notify?: boolean | null;
}

/**
 * Chat status for current bot
 */
export const enum ChatStatus {
    ACTIVE = 'active',
    REMOVED = 'removed',
    LEFT = 'left',
    CLOSED = 'closed',
    SUSPENDED = 'suspended'
}

/**
 * Bot gets this type of update as soon as title has been changed in chat
 */
export interface ChatTitleChangedUpdate {
    update_type: 'chat_title_changed';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Chat identifier where event has occurred
     */
    chat_id: number;
    /**
     * User who changed title
     */
    user: User;
    /**
     * New title
     */
    title: string;
}

/**
 * Type of chat
 * Dialog (one-on-one), chat or channel
 */
export const enum ChatType {
    DIALOG = 'dialog',
    CHAT = 'chat',
    CHANNEL = 'channel'
}

/**
 * Message constructed i in chat
 */
export interface ConstructedMessage {
    /**
     * Author who sent this message
     * Can be `null` if message has been posted on behalf of a channel
     */
    sender?: User;
    /**
     * Unix-time when message has been created
     */
    timestamp: number;
    /**
     * Any linked message: forward or reply
     */
    link?: LinkedMessage | null;
    /**
     * Body of created message
     * Text + attachments
     */
    body: MessageBody;
}

export interface ConstructedMessageBody {
    /**
     * Message text
     */
    text?: string | null;
    /**
     * Message attachments
     * See `AttachmentRequest` and it's inheritors for full information
     */
    attachments?: AttachmentRequest[] | null;
    /**
     * Text markup
     */
    markup?: MarkupElement[] | null;
    /**
     * Message text format
     * If set,
     */
    format?: TextFormat | null;
}

/**
 * Bot's answer on construction request
 */
export interface ConstructorAnswer {
    /**
     * Array of prepared messages
     * This messages will be sent as user taps on "Send" button
     */
    messages?: ConstructedMessageBody[];
    /**
     * If `true` user can send any input manually
     * Otherwise, only keyboard will be shown
     */
    allow_user_input?: boolean;
    /**
     * Hint to user
     * Will be shown on top of keyboard
     */
    hint?: string | null;
    /**
     * In this property you can store any additional data up to 8KB
     * We send this data back to bot within the
     * next construction request
     * It is handy to store here any state of construction session
     */
    data?: string;
    /**
     * Keyboard to show to user in constructor mode
     */
    keyboard?: Keyboard | null;
    /**
     * Text to show over the text field
     */
    placeholder?: string | null;
}

/**
 * It can be either message (text/attachments) or button callback
 */
export type ConstructorInput = CallbackConstructorInput | MessageConstructorInput;

export interface ContactAttachment {
    type: 'contact';

    payload: ContactAttachmentPayload;
}

export interface ContactAttachmentPayload {
    /**
     * User info in VCF format
     */
    vcf_info?: string | null;
    /**
     * User info
     */
    tam_info?: User | null;
}

/**
 * Request to attach contact card to message
 * MUST be the only attachment in message
 */
export interface ContactAttachmentRequest {
    type: 'contact';

    payload: ContactAttachmentRequestPayload;
}

export interface ContactAttachmentRequestPayload {
    /**
     * Contact name
     */
    name?: string | null;
    /**
     * Contact identifier if it is registered TamTam user
     */
    contact_id?: number | null;
    /**
     * Full information about contact in VCF format
     */
    vcf_info?: string | null;
    /**
     * Contact phone in VCF format
     */
    vcf_phone?: string | null;
}

/**
 * Represents *italic* in text
 */
export interface EmphasizedMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'emphasized';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
}

export interface FileAttachment {
    type: 'file';

    payload: FileAttachmentPayload;
    /**
     * Uploaded file name
     */
    filename: string;
    /**
     * File size in bytes
     */
    size: number;
}

export interface FileAttachmentPayload {
    /**
     * Media attachment URL
     */
    url: string;
    /**
     * Use `token` in case when you are trying to reuse the same attachment in other message
     */
    token: string;
}

/**
 * Request to attach file to message
 * MUST be the only attachment in message
 */
export interface FileAttachmentRequest {
    type: 'file';

    payload: UploadedInfo;
}

export interface GetPinnedMessageResult {
    /**
     * Pinned message
     * Can be `null` if no message pinned in chat
     */
    message?: Message | null;
}

/**
 * List of all WebHook subscriptions
 */
export interface GetSubscriptionsResult {
    /**
     * Current subscriptions
     */
    subscriptions: Subscription[];
}

/**
 * Represents header part of the text
 */
export interface HeadingMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'heading';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
}

/**
 * Represents a highlighted piece of text
 */
export interface HighlightedMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'highlighted';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
}

/**
 * Generic schema describing image object
 */
export interface Image {
    /**
     * URL of image
     */
    url: string;
}

/**
 * Buttons in messages
 */
export interface InlineKeyboardAttachment {
    type: 'inline_keyboard';

    payload: Keyboard;
}

/**
 * Request to attach keyboard to message
 */
export interface InlineKeyboardAttachmentRequest {
    type: 'inline_keyboard';

    payload: InlineKeyboardAttachmentRequestPayload;
}

export interface InlineKeyboardAttachmentRequestPayload {
    /**
     * Two-dimensional array of buttons
     */
    buttons: Button[][];
}

/**
 * Intent of button
 */
export const enum Intent {
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
    DEFAULT = 'default'
}

/**
 * Keyboard is two-dimension array of buttons
 */
export interface Keyboard {
    buttons: Button[][];
}

/**
 * After pressing this type of button user follows the link it contains
 */
export interface LinkButton {
    type: 'link';
    /**
     * Visible text of button
     */
    text: string;

    url: string;
}

/**
 * Represents link in text
 */
export interface LinkMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'link';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
    /**
     * Link's URL
     */
    url: string;
}

export interface LinkedMessage {
    /**
     * Type of linked message
     */
    type: MessageLinkType;
    /**
     * User sent this message
     * Can be `null` if message has been posted on behalf of a channel
     */
    sender?: User;
    /**
     * Chat where message has been originally posted
     * For forwarded messages only
     */
    chat_id?: number;

    message: MessageBody;
}

export interface LocationAttachment {
    type: 'location';

    latitude: number;

    longitude: number;
}

/**
 * Request to attach keyboard to message
 */
export interface LocationAttachmentRequest {
    type: 'location';

    latitude: number;

    longitude: number;
}

export type MarkupElement = StrongMarkup | EmphasizedMarkup | MonospacedMarkup | LinkMarkup | StrikethroughMarkup | UnderlineMarkup | UserMentionMarkup | HeadingMarkup | HighlightedMarkup;

export interface MediaAttachmentPayload {
    /**
     * Media attachment URL
     */
    url: string;
    /**
     * Use `token` in case when you are trying to reuse the same attachment in other message
     */
    token: string;
}

/**
 * Message in chat
 */
export interface Message {
    /**
     * User who sent this message
     * Can be `null` if message has been posted on behalf of a channel
     */
    sender?: User;
    /**
     * Message recipient
     * Could be user or chat
     */
    recipient: Recipient;
    /**
     * Unix-time when message was created
     */
    timestamp: number;
    /**
     * Forwarded or replied message
     */
    link?: LinkedMessage | null;
    /**
     * Body of created message
     * Text + attachments
     * Could be null if message contains only forwarded message
     */
    body: MessageBody;
    /**
     * Message statistics
     * Available only for channels in [getMessages]{@link TamTamBotAPI#getMessages} context
     */
    stat?: MessageStat | null;
    /**
     * Message public URL
     * Can be `null` for dialogs or non-public chats/channels
     */
    url?: string | null;
    /**
     * Bot-constructor created this message
     */
    constructor?: User | null;
}

/**
 * Schema representing body of message
 */
export interface MessageBody {
    /**
     * Unique identifier of message
     */
    mid: string;
    /**
     * Sequence identifier of message in chat
     */
    seq: number;
    /**
     * Message text
     */
    text?: string | null;
    /**
     * Message attachments
     * Could be one of `Attachment` type
     * See description of this schema
     */
    attachments?: Attachment[] | null;
    /**
     * Message text markup
     * See [Formatting](#section/About/Text-formatting) section for more info
     */
    markup?: MarkupElement[] | null;
}

/**
 * You will get this `update` as soon as user presses button
 */
export interface MessageCallbackUpdate {
    update_type: 'message_callback';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;

    callback: Callback;
    /**
     * Original message containing inline keyboard
     * Can be `null` in case it had been deleted by the moment a bot got this update
     */
    message?: Message | null;
    /**
     * Current user locale in IETF BCP 47 format
     */
    user_locale?: string | null;
}

/**
 * Bot will get this update when chat has been created as soon as first user clicked chat button
 */
export interface MessageChatCreatedUpdate {
    update_type: 'message_chat_created';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Created chat
     */
    chat: Chat;
    /**
     * Message identifier where the button has been clicked
     */
    message_id: string;
    /**
     * Payload from chat button
     */
    start_payload?: string | null;
}

/**
 * Bot will get this update when constructed message has been posted to any chat
 */
export interface MessageConstructedUpdate {
    update_type: 'message_constructed';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Constructor session identifier
     */
    session_id: string;
    /**
     * User message
     */
    message: ConstructedMessage;
}

/**
 * Bot will get this update when user sent to bot any message or pressed button during construction process
 */
export interface MessageConstructionRequest {
    update_type: 'message_construction_request';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * User who initiated this request
     */
    user: UserWithPhoto;
    /**
     * Current user locale in IETF BCP 47 format
     */
    user_locale?: string;
    /**
     * Constructor session identifier
     */
    session_id: string;
    /**
     * data received from previous `ConstructorAnswer`
     */
    data?: string | null;
    /**
     * User's input
     * It can be message (text/attachments) or simple button's callback
     */
    input: ConstructorInput;
}

/**
 * Bot will get this input in case when user sends message to bot manually
 */
export interface MessageConstructorInput {
    input_type: 'message';
    /**
     * Messages sent by user during construction process
     * Typically it is single element array but sometimes it can contains multiple messages
     * Can be empty on initial request when user just opened constructor
     */
    messages?: ConstructedMessageBody[] | null;
}

/**
 * You will get this `update` as soon as message is created
 */
export interface MessageCreatedUpdate {
    update_type: 'message_created';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Newly created message
     */
    message: Message;
    /**
     * Current user locale in IETF BCP 47 format
     * Available only in dialogs
     */
    user_locale?: string | null;
}

/**
 * You will get this `update` as soon as message is edited
 */
export interface MessageEditedUpdate {
    update_type: 'message_edited';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Edited message
     */
    message: Message;
}

/**
 * Type of linked message
 */
export const enum MessageLinkType {
    FORWARD = 'forward',
    REPLY = 'reply'
}

/**
 * Paginated list of messages
 */
export interface MessageList {
    /**
     * List of messages
     */
    messages: Message[];
}

/**
 * You will get this `update` as soon as message is removed
 */
export interface MessageRemovedUpdate {
    update_type: 'message_removed';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Identifier of removed message
     */
    message_id: string;
    /**
     * Chat identifier where message has been deleted
     */
    chat_id: number;
    /**
     * User who deleted this message
     */
    user_id: number;
}

/**
 * Message statistics
 */
export interface MessageStat {
    views: number;
}

/**
 * Represents `monospaced` or ```code``` block in text
 */
export interface MonospacedMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'monospaced';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
}

export interface NewMessageBody {
    /**
     * Message text
     */
    text?: string | null;
    /**
     * Message attachments
     * See `AttachmentRequest` and it's inheritors for full information
     */
    attachments?: AttachmentRequest[] | null;
    /**
     * Link to Message
     */
    link?: NewMessageLink | null;
    /**
     * If false, chat participants would not be notified
     */
    notify?: boolean;
    /**
     * If set, message text will be formated according to given markup
     */
    format?: TextFormat | null;
}

export interface NewMessageLink {
    /**
     * Type of message link
     */
    type: MessageLinkType;
    /**
     * Message identifier of original message
     */
    mid: string;
}

/**
 * Image attachment
 */
export interface PhotoAttachment {
    type: 'image';

    payload: PhotoAttachmentPayload;
}

export interface PhotoAttachmentPayload {
    /**
     * Unique identifier of this image
     */
    photo_id: number;

    token: string;
    /**
     * Image URL
     */
    url: string;
}

export interface PhotoAttachmentRequest {
    type: 'image';

    payload: PhotoAttachmentRequestPayload;
}

/**
 * Request to attach image
 * All fields are mutually exclusive
 */
export interface PhotoAttachmentRequestPayload {
    /**
     * Any external image URL you want to attach
     */
    url?: string | null;
    /**
     * Token of any existing attachment
     */
    token?: string | null;
    /**
     * Tokens were obtained after uploading images
     */
    photos?: { [key: string]: PhotoToken } | null;
}

export interface PhotoToken {
    /**
     * Encoded information of uploaded image
     */
    token: string;
}

/**
 * This is information you will receive as soon as an image uploaded
 */
export interface PhotoTokens {
    photos: { [key: string]: PhotoToken };
}

export interface PinMessageBody {
    /**
     * Identifier of message to be pinned in chat
     */
    message_id: string;
    /**
     * If `true`, participants will be notified with system message in chat/channel
     */
    notify?: boolean | null;
}

/**
 * New message recipient
 * Could be user or chat
 */
export interface Recipient {
    /**
     * Chat identifier
     */
    chat_id?: number | null;
    /**
     * Chat type
     */
    chat_type: ChatType;
    /**
     * User identifier, if message was sent to user
     */
    user_id?: number | null;
}

/**
 * After pressing this type of button client sends new message with attachment of current user contact
 */
export interface RequestContactButton {
    type: 'request_contact';
    /**
     * Visible text of button
     */
    text: string;
}

/**
 * Server returns this if there was an exception to your request
 */
export interface RequestError {
    /**
     * Error
     */
    error?: string;
    /**
     * Error code
     */
    code: string;
    /**
     * Human-readable description
     */
    message: string;
}

/**
 * After pressing this type of button client sends new message with attachment of current user geo location
 */
export interface RequestGeoLocationButton {
    type: 'request_geo_location';
    /**
     * Visible text of button
     */
    text: string;
    /**
     * If *true*, sends location without asking user's confirmation
     */
    quick?: boolean;
}

export interface SendMessageResult {
    message: Message;
}

/**
 * Different actions to send to chat members
 */
export const enum SenderAction {
    TYPING_ON = 'typing_on',
    SENDING_PHOTO = 'sending_photo',
    SENDING_VIDEO = 'sending_video',
    SENDING_AUDIO = 'sending_audio',
    SENDING_FILE = 'sending_file',
    MARK_SEEN = 'mark_seen'
}

export interface ShareAttachment {
    type: 'share';

    payload: ShareAttachmentPayload;
    /**
     * Link preview title
     */
    title?: string | null;
    /**
     * Link preview description
     */
    description?: string | null;
    /**
     * Link preview image
     */
    image_url?: string | null;
}

/**
 * Payload of ShareAttachmentRequest
 */
export interface ShareAttachmentPayload {
    /**
     * URL attached to message as media preview
     */
    url?: string | null;
    /**
     * Attachment token
     */
    token?: string | null;
}

/**
 * Request to attach media preview of any external URL
 */
export interface ShareAttachmentRequest {
    type: 'share';

    payload: ShareAttachmentPayload;
}

/**
 * Simple response to request
 */
export interface SimpleQueryResult {
    /**
     * `true` if request was successful
     * `false` otherwise
     */
    success: boolean;
    /**
     * Explanatory message if the result is not successful
     */
    message?: string;
}

export interface StickerAttachment {
    type: 'sticker';

    payload: StickerAttachmentPayload;
    /**
     * Sticker width
     */
    width: number;
    /**
     * Sticker height
     */
    height: number;
}

export interface StickerAttachmentPayload {
    /**
     * Media attachment URL
     */
    url: string;
    /**
     * Sticker identifier
     */
    code: string;
}

/**
 * Request to attach sticker
 * MUST be the only attachment request in message
 */
export interface StickerAttachmentRequest {
    type: 'sticker';

    payload: StickerAttachmentRequestPayload;
}

export interface StickerAttachmentRequestPayload {
    /**
     * Sticker code
     */
    code: string;
}

/**
 * Represents ~strikethrough~ block in text
 */
export interface StrikethroughMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'strikethrough';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
}

/**
 * Represents **bold** in text
 */
export interface StrongMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'strong';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
}

/**
 * Schema to describe WebHook subscription
 */
export interface Subscription {
    /**
     * Webhook URL
     */
    url: string;
    /**
     * Unix-time when subscription was created
     */
    time: number;
    /**
     * Update types bot subscribed for
     */
    update_types?: string[] | null;

    version?: string | null;
}

/**
 * Request to set up WebHook subscription
 */
export interface SubscriptionRequestBody {
    /**
     * URL of HTTP(S)-endpoint of your bot
     * Must starts with http(s)://
     */
    url: string;
    /**
     * List of update types your bot want to receive
     * See `Update` object for a complete list of types
     */
    update_types?: string[];
    /**
     * Version of API
     * Affects model representation
     */
    version?: string;
}

/**
 * Message text format
 */
export const enum TextFormat {
    MARKDOWN = 'markdown',
    HTML = 'html'
}

/**
 * Represents ++underlined++ part of the text
 */
export interface UnderlineMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'underline';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
}

/**
 * `Update` object represents different types of events that happened in chat
 * See its inheritors
 */
export type Update =
    | MessageCreatedUpdate
    | MessageCallbackUpdate
    | MessageEditedUpdate
    | MessageRemovedUpdate
    | BotAddedToChatUpdate
    | BotRemovedFromChatUpdate
    | UserAddedToChatUpdate
    | UserRemovedFromChatUpdate
    | BotStartedUpdate
    | ChatTitleChangedUpdate
    | MessageConstructionRequest
    | MessageConstructedUpdate
    | MessageChatCreatedUpdate;

/**
 * List of all updates in chats your bot participated in
 */
export interface UpdateList {
    /**
     * Page of updates
     */
    updates: Update[];
    /**
     * Pointer to the next data page
     */
    marker?: number | null;
}

/**
 * Endpoint you should upload to your binaries
 */
export interface UploadEndpoint {
    /**
     * URL to upload
     */
    url: string;
}

/**
 * Type of file uploading
 */
export const enum UploadType {
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    FILE = 'file'
}

/**
 * This is information you will receive as soon as audio/video is uploaded
 */
export interface UploadedInfo {
    /**
     * Token is unique uploaded media identifier
     */
    token?: string;
}

export interface User {
    /**
     * Users identifier
     */
    user_id: number;
    /**
     * Users visible name
     */
    name: string;
    /**
     * Unique public user name
     * Can be `null` if user is not accessible or it is not set
     */
    username?: string | null;
    /**
     * `true` if user is bot
     */
    is_bot: boolean;
    /**
     * Time of last user activity in TamTam (Unix timestamp in milliseconds)
     * Can be outdated if user disabled its "online" status in settings
     */
    last_activity_time: number;
}

/**
 * You will receive this update when user has been added to chat where bot is administrator
 */
export interface UserAddedToChatUpdate {
    update_type: 'user_added';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Chat identifier where event has occurred
     */
    chat_id: number;
    /**
     * User added to chat
     */
    user: User;
    /**
     * User who added user to chat
     * Can be `null` in case when user joined chat by link
     */
    inviter_id?: number | null;
    /**
     * Indicates whether user has been added to channel or not
     */
    is_channel: boolean;
}

export interface UserIdsList {
    user_ids: number[];
}

/**
 * Represents user mention in text
 * Mention can be both by user's username or ID if user doesn't have username
 */
export interface UserMentionMarkup {
    /**
     * Type of the markup element
     * Can be **strong**, *emphasized*, ~strikethrough~, ++underline++, `monospaced`, link or user_mention
     */
    type: 'user_mention';
    /**
     * Element start index (zero-based) in text
     */
    from: number;
    /**
     * Length of the markup element
     */
    length: number;
    /**
     * `@username` of mentioned user
     */
    user_link?: string | null;
    /**
     * Identifier of mentioned user without username
     */
    user_id?: number | null;
}

/**
 * You will receive this update when user has been removed from chat where bot is administrator
 */
export interface UserRemovedFromChatUpdate {
    update_type: 'user_removed';
    /**
     * Unix-time when event has occurred
     */
    timestamp: number;
    /**
     * Chat identifier where event has occurred
     */
    chat_id: number;
    /**
     * User removed from chat
     */
    user: User;
    /**
     * Administrator who removed user from chat
     * Can be `null` in case when user left chat
     */
    admin_id?: number;
    /**
     * Indicates whether user has been removed from channel or not
     */
    is_channel: boolean;
}

export interface UserWithPhoto {
    /**
     * Users identifier
     */
    user_id: number;
    /**
     * Users visible name
     */
    name: string;
    /**
     * Unique public user name
     * Can be `null` if user is not accessible or it is not set
     */
    username?: string | null;
    /**
     * `true` if user is bot
     */
    is_bot: boolean;
    /**
     * Time of last user activity in TamTam (Unix timestamp in milliseconds)
     * Can be outdated if user disabled its "online" status in settings
     */
    last_activity_time: number;
    /**
     * User description
     * Can be `null` if user did not fill it out
     */
    description?: string | null;
    /**
     * URL of avatar
     */
    avatar_url?: string;
    /**
     * URL of avatar of a bigger size
     */
    full_avatar_url?: string;
}

export interface VideoAttachment {
    type: 'video';

    payload: MediaAttachmentPayload;
    /**
     * Video thumbnail
     */
    thumbnail?: PhotoAttachmentPayload | null;
    /**
     * Video width
     */
    width?: number | null;
    /**
     * Video height
     */
    height?: number | null;
    /**
     * Video duration in seconds
     */
    duration?: number | null;
}

/**
 * Request to attach video to message
 */
export interface VideoAttachmentRequest {
    type: 'video';

    payload: UploadedInfo;
}
