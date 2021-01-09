import { createAPI, Update } from 'tamtam-bot-api';

const api = createAPI(process.argv[2]);

let MARKER = 0;

function startPolling() {
    api.getUpdates({ marker: MARKER }).then(({ updates, marker }) => {
        MARKER = marker || MARKER;

        updates.forEach((update: Update) => {
            if (update.update_type === 'message_created') {
                const { body, sender } = update.message;

                api.sendMessage({ text: body?.text }, sender?.user_id);
            }
        });

        startPolling();
    });
}

startPolling();
