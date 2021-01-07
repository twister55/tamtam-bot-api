/* eslint-disable no-console */
import { createAPI } from 'tamtam-bot-api';

createAPI(process.argv[2]).getMyInfo().then(console.log).catch(console.error);
