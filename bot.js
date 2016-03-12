require('dotenv').load();
var irc = require('irc');
var nconf = require('nconf');

global.BOT = {};

nconf.env().file({file: 'config.json'});

nconf.defaults({
    name: 'rigitv', // the bots twitch username
    botname: 'rigibot', // the bots name (only for display in console)
    oauth: '', // the auth token for twitch
    channel: '#rigitv', // the channel this bot needs to join (ex. #rigitv)
    admins: ['rigitv'], // people who can use commands.
    triggers: {}, // chat triggers
    isMod: false, // is the bot a mod?
});

/**
 * Global bot settings
 */
BOT.settings = {
    name: nconf.get('name'),
    botname: nconf.get('botname'),
    oauth: nconf.get('OAUTH'),
    channel: nconf.get('channel'),
    admins: nconf.get('admins'),
    isMod: nconf.get('isMod')
};


BOT.getRate = function () {
    if (BOT.settings.isMod) {
        return BOT.rates.mod;
    }

    return BOT.rates.default;
}

BOT.rates = {
    mod: 100,
    default: 20,
    interval: function () {
        return 30 * 1000 / BOT.getRate();
    }
}

BOT.triggers = nconf.get("triggers");

/**
 * The commands for this bot!
 */
BOT.commands = require('./commands.js')

BOT.client = new irc.Client('irc.twitch.tv', BOT.settings.name, {
    sasl: true,
    nick: BOT.settings.name,
    password: BOT.settings.oauth,
    channels: [BOT.settings.channel],
    secure: true
});

require('./listeners.js');
require('./utils.js');
