var fs = require('fs');
var chalk = require('chalk');

BOT.getCommand = function (command) {
    if (BOT.commands.hasOwnProperty(command)) {
        return BOT.commands[command];
    }
    return false;
}

BOT.getCurrentTimestampFormat = function () {
    var datetime = new Date().toISOString().slice(0, 19);
    return "[" + datetime.replaceAt(10, ' ') + "]";
}

BOT.logInfo = function (message) {
    console.log(chalk.yellow.bold("[" + BOT.settings.botname + "] ") + chalk.bgGreen.white.bold(BOT.getCurrentTimestampFormat()) + " " + message);
}

BOT.logMessage = function (message) {
    BOT.logInfo(message);
    var data = BOT.getCurrentTimestampFormat() + " " + message + "\n";
    fs.appendFile('bot.log', data, function (err) {
        if (err) BOT.logInfo('error: ' + err);
    });
}

BOT.say = function (message) {
    BOT.logInfo("Sending message: " + message);
    BOT.client.say(BOT.settings.channel, message);
}

/**
 * Add a replace method to the String prototype
 *
 * @param index
 * @param character
 * @returns {string} with replaced character
 */
String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}
