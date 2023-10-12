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

// Import the Interact class
const Interact = require('./src/interact');

// Comment out the following line as you don't need 'token' anymore
// const { debug, wordDicPath, token } = require('./config/setting');

// START OF JSON ADDITION

const fs = require('fs');
const config = require('/workspaces/discord-bot/config/setting.js'); // Use the correct path to your settings.js file


// Access values from the config object
const debug = config.debug;
const wordDicPath = config.wordDicPath;
const token = config.token;
const regexResponses = config.regexResponses;

// Now you can use these variables in your code

// END OF JSON ADDITION

// Log the received message to the console
client.on('message', msg => {
    // Ignore messages from bots to avoid responding to other bots
    if (msg.author.bot) return;

    console.log(`Received message: ${msg.content}`);

    // Regular expression to match "wide" in any capitalization
    const wideRegex = /wide/i; // The 'i' flag makes it case-insensitive

    if (wideRegex.test(msg.content)) {
        console.log('Message contains "wide".');
        // Respond with "Mr. WorldWide"
        msg.channel.send('Mr. WorldWide')
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }
});


// Handle Discord API errors
client.on('error', error => {
    console.error('Discord API error:', error);
});

// Log in using the discordToken
client.login(discordToken);
