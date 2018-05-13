/* eslint-disable no-console */
const { client } = require('./configuration');
const { hashtagBot } = require('./hashtagBot');
const { reply } = require('./reply');

hashtagBot(client);
reply(client);
