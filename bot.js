require('dotenv').load();
var irc = require('irc');
global.BOT = {};

/**
 * Global bot settings
 */
BOT.settings = {
    name: 'rigitv', // the bots twitch username
    botname: 'rigibot', // the bots name (only for display in console)
    oauth: process.env.OAUTH, // the auth token for twitch
    channel: '#rigitv', // the channel this bot needs to join (ex. #rigitv)
    admins: ['rigitv'] // people who can use commands.
};

/**
 * The commands for this bot!
 */
BOT.commands = {
    'info': function () {
        BOT.say("I'm a BOT by RigiTv! PogChamp");
    },
    'help': function (user) {
        BOT.say("/me " + user + " here's no help for you son!");
    },
    'ping': function () {
        BOT.say("/me PONG!!!");
    },
    'lines': require('./commands/lines.js')
}

BOT.client = new irc.Client('irc.twitch.tv', BOT.settings.name, {
    sasl: true,
    nick: BOT.settings.name,
    password: BOT.settings.oauth,
    channels: [BOT.settings.channel]
});

require('./listeners.js');
require('./utils.js');