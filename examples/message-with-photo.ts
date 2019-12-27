import { readFileSync } from 'fs';
import { TamTamBotAPI, AttachmentType, PhotoTokens, PhotoToken } from 'tamtam-bot-api';
import * as FormData from 'form-data';

const api = new TamTamBotAPI(process.argv[2]);

const file = readFileSync(process.argv[4]);
const data = new FormData();
data.append('v1', file, {
    filename: 'photo.jpeg',
    knownLength: file.length
});

api.upload('image')
    .then(({ url }) => {
        return api.transport.request<PhotoTokens>('POST', url, {
            headers: data.getHeaders(),
            data
        });
    })
    .then(({ photos }) => {
        const params = {
            user_id: process.argv[3]
        };

        return api.sendMessage(params, {
            text: 'test',
            attachments: Object.values<PhotoToken>(photos).map(photo => ({
                type: AttachmentType.IMAGE,
                payload: {
                    token: photo.token
                }
            }))
        });
    })
    .catch(({ code, message }) => {
        console.log('Error', code, message);
    });
