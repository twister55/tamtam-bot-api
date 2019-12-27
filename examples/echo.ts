import { TamTamBotAPI, UpdateType, Update } from 'tamtam-bot-api';

const api = new TamTamBotAPI(process.argv[2]);

let MARKER: number = 0;

function startPolling() {
    api.getUpdates({
        marker: MARKER
    }).then(({ updates, marker }) => {
        MARKER = marker;

        updates.forEach((update: Update) => {
            if (update.update_type === UpdateType.MESSAGE_CREATED) {
                api.sendMessage({
                    user_id: update.message.sender!.user_id
                }, {
                    text: update.message.body!.text
                });
            }
        });

        startPolling();
    });
}

startPolling();
