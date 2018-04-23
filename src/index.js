const Twitter = require('twitter');

require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const stream = client.stream('statuses/filter', { track:'#LittleFishBot' });

stream.on('data', (event) => {

  client.post('favorites/create', { id: event.id_str }, (error, response) => {
    if(error) throw error;
    console.log('Tweet ID: ' + response.id_str + ' Liked! - "' + response.text + '"');
  });

});

stream.on('error', (error) => {
  console.log('--error--');
  throw error;
});
