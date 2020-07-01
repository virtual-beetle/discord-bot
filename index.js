'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { debug, wordDicPath, botIds, token } = require('./config/setting');

// first pass read
let wordDic = JSON.parse(fs.readFileSync(wordDicPath));

if (debug) console.log(wordDic);

// watch for the file
fs.watch(wordDicPath, (event, filename) => {
    if (filename) {
        if (debug) console.log(`${filename} has been updated.`);
        fs.readFile(filename, (err, data) => {
            if (err) console.error(err);

            wordDic = JSON.parse(data);
        });
    }
});

// start up log message
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// message processing part
client.on('message', msg => {
    // default timeout
    let timeout = 1000;
    // if (debug) console.log(msg.author.id);

    // if it is a message from a bot, ignore it
    if (msg.author.bot) {
        return;
    }

    setTimeout(respondMessage, timeout, msg, wordDic);
});

client.login(token);

function respondMessage(msg, wordDic) {
    let msgctn = msg.content.replace("\n", "");

    for (let keyword in wordDic) {
        // if (debug) console.log(keyword);
        let re = new RegExp(keyword, 'i');
        if (msgctn.match(re)) {
            msg.channel.send(wordDic[keyword]);
            break;
        }
    }

    return;
}