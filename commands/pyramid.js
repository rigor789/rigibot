module.exports = function (user, args) {
    if(args.length < 1) {
        return;
    }
    var emote = args[0];
    var width = (args[1] < 7 ? args[1] : 6) || 3;
    var i = 1;
    var descend = false;

    (function f() {
        sendMessage(i, emote)
        if(descend = (descend || i+1 > width)) {
            i--;
        } else {
            i++;
        }
        if( (!descend && i < width+1) || (descend && i > 0) ){
            setTimeout( f, BOT.settings.interval );
        }
    })();
}

var sendMessage = function(times, emote) {
    var text = Array(times+1).join(emote + " ");
    BOT.say(text);
}