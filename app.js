var config = require('./config.json');
var Twitter = require('twitter');
var low = require('lowdb');
var storage = require('lowdb/file-sync');

var session = low('./config.json', {'storage': storage});
var client = new Twitter(config.api);

client.stream('statuses/filter', {
  'follow': config.user.id_str
}, function (stream) {
  stream.on('data', function (tweet) {
    // only reply to tweets _from_ user
    if (!tweet.user || tweet.user.screen_name !== config.user.name ) return;

    var messages = session.object.messages;
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];

    client.post('statuses/update', {
      'in_reply_to_status_id': tweet.id_str,
      status: '@' + config.user.name + ' ' + randomMessage
    }, function (err) {
      if (err) handleError(err);

      console.log('REPLIED TO ' + config.user.name.toUpperCase() + '\'s TWEET ', tweet.text, ' WITH ', randomMessage);
      console.log('')
      // clean up messages
      session.object.messages = session.object.messages.filter(function (m) {
        return m !== randomMessage;
      });

      if (session.object.usedMessages) {
        session.object.usedMessages.push(randomMessage)

        // if we've run out of messages, swap used and available
        if (!session.object.messages.length) {
          session.object.messages = session.object.usedMessages.slice(0);
          session.object.usedMessages = [];
        }
      }
      // create usedMessages if doesnt exist
      else {
        session.object.usedMessages = [randomMessage];
      }

      // save session
      session.write();
    });
  });

  stream.on('error', handleError);
});

function handleError (err) {
  console.log(err);
  process.exit();
}


