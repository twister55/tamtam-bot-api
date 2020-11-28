/* eslint-disable no-console */
import { createAPI } from 'tamtam-bot-api';

const api = createAPI(process.argv[2]);

api.getBotInfo()
    .then(({ user_id, name, description }) => {
        console.log(`My bot's id is ${user_id}. My bot's name is ${name}. My bot's description is '${description}`);
    })
    .catch(({ message, code }) => {
        console.error('Error', message, code);
    });
