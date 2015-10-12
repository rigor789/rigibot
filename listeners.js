BOT.client.addListener('message' + BOT.settings.channel, function (from, message) {
    BOT.logMessage('[' + BOT.settings.channel + '] ' + from + ": " + message);

    if (message.charAt(0) == '!') {
        var parts = message.split(' ');
        var command = parts[0].substr(1, parts[0].length);
        var cmd = BOT.getCommand(command);
        if (cmd) {
            BOT.logInfo('executing command: ' + command);
            cmd(from, parts.splice(1));
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