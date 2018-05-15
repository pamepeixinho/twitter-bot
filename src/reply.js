/* eslint-disable no-console */

const username = '@pamepeixinho';

const TRACKING_TWEET = `Olá ${username}`;

const getStatus = tweetAuthorUsername => `Ola @${tweetAuthorUsername}, meu nome é peixinho e minha praia é codar`;

const reply = (client) => {
  const stream = client.stream('statuses/filter', { track: TRACKING_TWEET });

  stream.on('data', (event) => {
    console.log(event.user.screen_name);

    client.post(
      'statuses/update',
      {
        status: getStatus(event.user.screen_name),
        in_reply_to_status_id: event.id_str,
        auto_populate_reply_metadata: true,
      },
      (error, response) => {
        if (error) throw error;
        console.log(`Tweet ID: ${response.id_str} replied`);
      },
    );
  });

  stream.on('error', (error) => {
    console.log('--error--', error);
  });
};

module.exports = { reply };
