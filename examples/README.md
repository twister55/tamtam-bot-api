# Examples

Examples in typescript so first of all you need install dependencies and compile it to javascript

```bash
npm install
npm run build
```
 
To run examples you need access token. If you don't have it contact [@PrimeBot](http://tt.me/primebot)

## bot-info

Simple example that prints information about bot to console

```bash
node bot-info.js <ACCESS_TOKEN>
```

## echo

Bot that will respond to your messages with the same text using `getUpdates` method

```bash
node echo.js <ACCESS_TOKEN>
```

## message-with-photo

Sends photo from file system to user (NB before run this example user must press 'start' button)

```bash
node message-with-photo.js <ACCESS_TOKEN> <USER_ID> <PATH_TO_PHOTO>
```
