# TamTam Bot API

[![Build Status](https://travis-ci.com/twister55/tamtam-bot-api.svg?branch=master)](https://travis-ci.com/twister55/tamtam-bot-api)
[![NPM download](https://img.shields.io/npm/dt/tamtam-bot-api?style=flat)](https://www.npmjs.com/package/tamtam-bot-api)
[![NPM version](https://img.shields.io/npm/v/tamtam-bot-api?style=flat)](https://www.npmjs.com/package/tamtam-bot-api)
[![Minzipped size](https://img.shields.io/bundlephobia/minzip/tamtam-bot-api?style=flat)](https://bundlephobia.com/result?p=tamtam-bot-api)
[![Bot API](https://img.shields.io/badge/TamTam%20Bot%20API-v0.3.0-blue)](https://dev.tamtam.chat)
[![LICENSE](https://img.shields.io/npm/l/tamtam-bot-api?type=flat)](https://github.com/twister55/tamtam-bot-api/blob/master/LICENSE)

Lightweight tree-shakable customizable module to interact with TamTam Bot API with full Typescript support 

## Requirements

To use TamTam Bot API you should obtain `ACCESS_TOKEN` for each bot you create

Interact with [@PrimeBot](http://tt.me/primebot) to create your first bot

## Install

To install the stable version:

```bash
npm install --save tamtam-bot-api
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

## Usage

To make your first request just provide API token to `createAPI` function or set `TAMTAM_API_TOKEN` env variable

```js
const { createAPI } = require('tamtam-bot-api');

createAPI(/* TAMTAM_API_TOKEN */)
    .getMyInfo()
    .then(console.log)
    .catch(console.error);
```

## HTTP Library

Default version uses [axios](https://www.npmjs.com/package/axios) to make HTTP requests

If you are using other HTTP library you can run
 
```bash
npm install --save --no-optional tamtam-bot-api
```

Then provide your own http implementation to `createAPI` function

## Echo bot example

A Simple bot that will respond to your messages with the same text using polling of `getUpdates` method

```typescript
import { createAPI, Update } from 'tamtam-bot-api';

const api = createAPI(/* TAMTAM_API_TOKEN */);

let MARKER = 0;

function startPolling() {
    api.getUpdates({ marker: MARKER }).then(({ updates, marker }) => {
        MARKER = marker || MARKER;

        updates.forEach((update: Update) => {
            if (update.update_type === 'message_created') {
                const { body, sender } = update.message;

                api.sendMessage({ text: body?.text }, { user_id: sender?.user_id });
            }
        });

        startPolling();
    });
}

startPolling();
```

You can play with example on RunKit: [long polling](https://runkit.com/twister55/tamtam-echo-bot), [web hook endpoint](https://runkit.com/twister55/tamtam-echo-bot-web-hook)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project licensed under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).
