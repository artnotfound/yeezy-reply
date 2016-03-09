# yeezy-reply

Automatically reply to @kanyewest tweets before regular humans can.

# Usage:

Put your [Twitter App credentials](http://iag.me/socialmedia/how-to-create-a-twitter-app-in-8-easy-steps/) and the messages you would like to send (without any @mention) inside the `config.json` file.

eg:

```json
{
  "user": {
    "name": "kanyewest",
    "id": 169686021
  },
  "messages": [
    "Please meet me at the Spotted Pig. I've been waiting for you there since that tweet.",
    "Size 9, please Kanye.",
    "I created this bot just to say thank you, Kanye."
  ],
  "api": {
    "consumer_key": "1232131ixsad123",
    "consumer_secret": "sad0123102391039da01",
    "access_token_key": "lolololoalseowoakdsa",
    "access_token_secret": "102391siadonandkanyewestforpresidentsada"
  }
}
```

Then simply run `npm start`.

The script will use up every message at least once and then reset the process over again.

# Notes:

* Use at your own risk. More fuccboi code here.
* This script will work for any user, just replace the name and get the user id from [here](http://gettwitterid.com/)
