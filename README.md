# TamTam Bot API

[![Bot API](https://img.shields.io/badge/TamTam%20Bot%20API-v0.2.0-blue)](https://dev.tamtam.chat)

## Requirements
To use TamTam Bot API you should obtain `ACCESS_TOKEN` for each bot you create.

Talk to [@PrimeBot](http://tt.me/primebot). It will helps you to create your first bot.

## Install

To install the stable version:

```bash
npm install --save tamtam-bot-api
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

## Usage

```js
const { TamTamBotAPI } = require('tamtam-bot-api');

const api = TamTamBotAPI.create(process.argv[2]);

api.getBotInfo().then(({ user_id, name, description }) => {
    console.log(`My bot's id is ${user_id}. My bot's name is ${name}. My bot's description is '${description}`);
}).catch(err => {
    console.error('Error', err.message, err.code);
});

```
For other examples check [examples folder](https://github.com/twister55/tamtam-bot-api/tree/master/examples)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).
