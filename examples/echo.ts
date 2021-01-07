import { createAPI, Update } from 'tamtam-bot-api';

const api = createAPI(process.argv[2]);

let MARKER = 0;

function startPolling() {
    api.getUpdates(100, 30000, MARKER).then(({ updates, marker }) => {
        MARKER = marker || MARKER;

        updates.forEach((update: Update) => {
            if (update.update_type === 'message_created') {
                api.sendMessage(
                    {
                        text: update.message.body?.text,
                        attachments: null,
                        link: null
                    },
                    update.message.sender?.user_id
                );
            }
        });

        startPolling();
    });
}

startPolling();
