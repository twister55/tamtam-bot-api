const { TamTamBotAPI } = require('./dist');

const api = TamTamBotAPI.create(process.argv[2]);

api.setBotInfo({
    description: '123'
}).then(resp => {
    console.log(resp);
}).catch(err => {
    console.error('Error', err.message, err.code);
    console.error(err);
});
