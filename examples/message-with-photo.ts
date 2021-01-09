/* eslint-disable no-console */
import { readFileSync } from 'fs';
import { createAPI, UploadType, PhotoTokens, PhotoToken } from 'tamtam-bot-api';
import * as FormData from 'form-data';

const api = createAPI(process.argv[2]);

const file = readFileSync(process.argv[4]);
const data = new FormData();
data.append('v1', file, {
    filename: 'photo.jpeg',
    knownLength: file.length
});

api.getUploadUrl(UploadType.IMAGE)
    .then(({ url }) => {
        return api.client.request<PhotoTokens>('POST', url, {
            headers: data.getHeaders(),
            data
        });
    })
    .then(({ photos }) => {
        return api.sendMessage(
            {
                text: 'test',
                link: null,
                attachments: Object.values<PhotoToken>(photos).map(photo => ({
                    type: 'image',
                    payload: {
                        token: photo.token
                    }
                }))
            },
            {
                user_id: Number(process.argv[3])
            }
        );
    })
    .catch(console.error);
