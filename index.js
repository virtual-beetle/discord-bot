    'use strict';

require('dotenv').config();
const discordToken = process.env.DISCORD_TOKEN;

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        // Add other intents as needed
    ]
});

const Interact = require('./src/interact');

// Comment out the following line as you don't need 'token' anymore
// const { debug, wordDicPath, token } = require('./config/setting');

// START OF JSON ADDITION 

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/setting.json'));

// Access values from the config object
const debug = config.debug;
const wordDicPath = config.wordDicPath;
const token = config.token;
const regexResponses = config.regexResponses;

// Now you can use these variables in your code


//END OF JSON ADDITION 

// first pass read
let wordDic = JSON.parse(fs.readFileSync(wordDicPath));

// Initiate the Interact instance
let inter = new Interact();

if (debug) console.log(wordDic);

// watch for the file
fs.watch(wordDicPath, filename => {
    if (filename) {
        if (debug) console.log(`${filename} has been updated.`);
        fs.readFile(wordDicPath, (err, data) => {
            if (err) return console.error(err);
            try {
                wordDic = JSON.parse(data);
                console.log('wordDic successfully updated');
            } catch (e) {
                return console.error(e);
            }
        });
    }
});

// start up log message
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.clear();
});

// message processing part
client.on('message', msg => {
    if (msg.author.bot) return;

    const content = msg.content.toLowerCase();

    if (content.includes('wide')) {
        console.log('Detected "wide" in message:', msg.content);
        msg.channel.send('Mr. WorldWide');
    }
});



// You can use discordToken for logging in
client.login(discordToken);