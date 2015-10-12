module.exports = function (user, args) {
    if (args.length > 0) {
        return BOT.say('/me ' + args[0] + " has written too many lines Kappa [not implemented]");
    }

    return BOT.say('/me ' + user + " you have written infinite number of lines Kappa [not implemented]");
}