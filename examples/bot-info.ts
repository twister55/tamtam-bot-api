import { TamTamBotAPI } from 'tamtam-bot-api';

const api = new TamTamBotAPI(process.argv[2]);

api.getBotInfo()
    .then(({ user_id, name, description }) => {
        console.log(`My bot's id is ${user_id}. My bot's name is ${name}. My bot's description is '${description}`);
    })
    .catch(({ message, code }) => {
        console.error('Error', message, code);
    });
