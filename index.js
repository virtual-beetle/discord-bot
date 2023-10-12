'use strict';

require('dotenv').config();
const discordToken = process.env.DISCORD_TOKEN;



const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, // Required for server and member-related events
        GatewayIntentBits.GuildMessages, // Required for message events
        // Add other intents as needed
    ] 
});

const fs = require('fs');
const { debug, wordDicPath, token } = require('./config/setting');
const Interact = require('./src/interact');

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
});

// message processing part
client.on('message', msg => {
    // if it is a message from a bot, ignore it
    if (msg.author.bot) return console.log("Message from a bot.\nBreak.");
    
    // default timeout
    let timeout = 1000;
    // if (debug) console.log(msg.author.id);

    let execFun;
    let params;
    if (msg.content.startsWith('!') || msg.content.startsWith('！')) {
        execFun = inter.commandProcess.bind(inter);
        params = msg;
    } else if (inter.replyOnMessage) {
        execFun = Interact.respondMessage;
        params = {msg,wordDic};
    } else return console.log("Reply on message disabled.");

    setTimeout(execFun, timeout, params);
});

client.login(token);
