/* eslint-disable no-console */

const hashtagBot = (client) => {
  const stream = client.stream('statuses/filter', { track: '#LittleFishBot' });

  stream.on('data', (event) => {
    client.post('favorites/create', { id: event.id_str }, (error, response) => {
      if (error) throw error;
      console.log(`Tweet ID: ${response.id_str} Liked! - "${response.text}"`);
    });
  });

  stream.on('error', (error) => {
    console.log('--error--', error);
  });
};

module.exports = { hashtagBot };
