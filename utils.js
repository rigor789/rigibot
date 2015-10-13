var fs = require('fs');
var chalk = require('chalk');
var RateLimiter = require('limiter').RateLimiter;

BOT.limiter = new RateLimiter(BOT.getRate(), 30 * 1000, true);

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

BOT.isMe = function (user) {
    return BOT.settings.name.toLowerCase() == user.toLowerCase();
}

BOT.getLogPrefix = function () {
    return chalk.yellow.bold("[" + BOT.settings.botname + "] ");
}

BOT.logInfo = function (message) {
    console.log(BOT.getLogPrefix() + chalk.bgCyan.white.bold(BOT.getCurrentTimestampFormat()) + " " + message);
}

BOT.logError = function (message) {
    console.log(BOT.getLogPrefix() + chalk.bgRed.white.bold(BOT.getCurrentTimestampFormat()) + " " + message);
}

BOT.logSuccess = function (message) {
    console.log(BOT.getLogPrefix() + chalk.bgGreen.white.bold(BOT.getCurrentTimestampFormat()) + " " + message);
}

BOT.logMessage = function (message) {
    BOT.logInfo(message);
    var data = BOT.getCurrentTimestampFormat() + " " + message + "\n";
    fs.appendFile('bot.log', data, function (err) {
        if (err) BOT.logInfo('error: ' + err);
    });
}

BOT.say = function (message, retryIfFailed) {
    BOT.limiter.removeTokens(1, function (err, remaining) {
        if (remaining < 0) {
            if (retryIfFailed) {
                BOT.sayLater(message, true);
                return BOT.logInfo('Trying to send messages too quickly, retrying!');
            } else {
                return BOT.logError('Trying to send messages too quickly, skipping!');
            }
        }

        BOT.logSuccess("Sending message: " + message);
        //BOT.client.say(BOT.settings.channel, message);
    });
}

BOT.sayLater = function (message, retryIfFailed) {
    setTimeout(function () {
        BOT.say(message, retryIfFailed);
    }, BOT.rates.interval());
}

BOT.runCommandLater = function (cmd, user, args) {
    setTimeout(function () {
        cmd(user, args);
    }, BOT.rates.interval());
}

BOT.hasTriggerFor = function (message) {
    for (var trigger in BOT.triggers) {
        if (BOT.triggers.hasOwnProperty(trigger)) {
            if (trigger == message.toLowerCase()) return true;
        }
    }
    return false;
}

BOT.getTriggerFor = function (message) {
    return BOT.triggers[message.toLowerCase()];
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
