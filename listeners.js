BOT.client.addListener('message' + BOT.settings.channel, function (from, message) {
    BOT.logMessage('[' + BOT.settings.channel + '] ' + from + ": " + message);

    if (BOT.isMe(from)) {
        BOT.limiter.removeTokens(1, function () {
            BOT.logInfo('Counting ' + from + ' into the rate limit!');
        });
    }

    if (BOT.hasTriggerFor(message)) {
        BOT.logSuccess('executing trigger for: ' + message);
        var message = BOT.getTriggerFor(message).replace("{{name}}", from);
        if (BOT.isMe(from)) {
            BOT.sayLater(message);
        } else {
            BOT.say(message);
        }
    }

    if (BOT.settings.admins.indexOf(from) == -1) return;
    if (message.charAt(0) == '!') {
        var parts = message.split(' ');
        var command = parts[0].substr(1, parts[0].length);
        var cmd = BOT.getCommand(command);
        if (cmd) {
            BOT.logSuccess('executing command: !' + command);
            if (BOT.isMe(from)) {
                BOT.runCommandLater(cmd, from, parts.splice(1));
            } else {
                cmd(from, parts.splice(1));
            }
        }
    }

});

BOT.client.addListener('error', function (message) {
    BOT.logInfo('error: ' + message);
});

BOT.client.addListener('registered', function (e) {
    BOT.logInfo('Now Connected to ' + e.server);
});

BOT.client.addListener('join', function (channel) {
    BOT.logInfo('Joined ' + channel);
});