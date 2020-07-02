# Discord Chat Bot

This is a very tiny project which implements a bot that could interact with users in channel.
It is based on `discord.js`.

[Here](https://discordpy.readthedocs.io/en/latest/discord.html) is a how-to for setting up a discord bot.

## Function

Very limited for now.
* Dynamically load your customized dictionary
* Use regex to match words from the chat (in channel)

## Prequisity

* Nodejs >= 12.0
* Npm >= 6.0

## Installation

### For Windows
You can download the project as a zip and unzip it. Of course you can choose to git clone it.
Then chdir into the project. Use `npm i` to install the dependencies.

### For *nix/macOS

```shell
git clone https://github.com/lzhxwmr/discord-bot.git && cd discord-bot
npm i
```
## Modify your config
As you can see in this repository, you should first modify `config/setting.js.bak` to make it work.

It should also be renamed to `setting.js`

```javascript
const debug = false;        // whether to open console log debug
const wordDicPath = "./config/sample.json";    // path for your word dictionary

const token = 'your tokens'; // token for your bot

// DO NOT EDIT LINES BELOW
module.exports = {
    debug,
    wordDicPath,
    token
}
```

And if you want to add more regex and response to the bot, you should maintain a word dictionary of your own.

The format is given in the sample.json.

The bot would reply in channel with the response if any regex is matched.

All the entries are traversed in order such that upper entries get higher priority.

And in one message only one of the regex would be matched, thus only one response would be made.

**Tip: Remember to esacape those special characters.**

```json
{
    "<regex>": "<response>",
    "foo": "bar"
}
```
## Run

### Run as a node program

Run it as a program and you could see the console logs.
This is not recommended since you don't have to restart your program to load new word dictionary.
```shell
node index.js
```

### Manage By pm2

It is recommended to manage your nodejs programs by pm2.

```shell
npm i pm2 -g
pm2 start index.js --name discord_bot
pm2 save
```

## FAQ

**Q: PM2 cannot load(on windows powershell)**

A: Open up powershell(Admin) then input below command and enter:
```powershell
set-ExecutionPolicy RemoteSigned
```