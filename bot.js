require('dotenv').load();
var irc = require('irc');
var nconf = require('nconf');

global.BOT = {};

nconf.file({file: 'config.json'});

nconf.defaults({
    name: 'rigitv', // the bots twitch username
    botname: 'rigibot', // the bots name (only for display in console)
    oauth: process.env.OAUTH, // the auth token for twitch
    channel: '#rigitv', // the channel this bot needs to join (ex. #rigitv)
    admins: ['rigitv'] // people who can use commands.
});

/**
 * Global bot settings
 */
BOT.settings = {
    name: nconf.get('name'),
    botname: nconf.get('botname'),
    oauth: nconf.get('oauth'),
    channel: nconf.get('channel'),
    admins: nconf.get('admins')
};

/**
 * The commands for this bot!
 */
BOT.commands = require('./commands.js')

BOT.client = new irc.Client('irc.twitch.tv', BOT.settings.name, {
    sasl: true,
    nick: BOT.settings.name,
    password: BOT.settings.oauth,
    channels: [BOT.settings.channel]
});

require('./listeners.js');
require('./utils.js');