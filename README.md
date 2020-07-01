# Discord Chat Bot

This is a very tiny project which implements a bot that could interact with users in channel.

## Function

Very limited for now.
* Dynamically load your customized dictionary
* Use regex to match words from the chat (in channel)

## Prequisity

* Nodejs >= 12.0
* Npm >= 6.0

## How-To

1. git clone https://github.com/lzhxwmr/discord-bot.git
2. cd discord-bot
3. npm i
4. npm i pm2 -g
5. pm2 start index.js --name discord_bot
5. pm2 save
6. have fun

## FAQ

**Q: PM2 cannot load**

A: Open up powershell(Admin) then input 
```powershell
set-ExecutionPolicy RemoteSigned
```

and press enter