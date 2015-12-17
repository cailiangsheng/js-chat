var _ = require('underscore');
var serverUser = require('./chat-user').serverUser;
var users = require('./chat-users');
var commands = {
    '/name': changeUserName,
    '/color': changeUserColor,
    '/ping': feedback,
    '/list': sendUserList,
    '/quit': userQuit
};

module.exports = {
    isCommand: getCommand,
    execute: execute
};

function getRegExp(command) {
    return new RegExp('^\\s*(\\' + command + ')\\s*(.*)\\s*$', 'i');
}

function getCommand(message) {
    var command = null;
    _.find(commands, function (value, key) {
        var pattern = getRegExp(key);
        var parts = message.match(pattern);
        if (parts) {
            command = {
                name: parts[1],
                text: parts[2],
                handler: value
            }
            return true;
        }
        return false;
    });
    return command;
}

function execute(message, user) {
    var command = getCommand(message);
    if (command) {
        var text = command.text;
        command.handler(user, text);
    }
}

function changeUserName(user, text) {
    var newName = text;
    user.setName(newName);
}

function changeUserColor(user, text) {
    var newColor = text;
    user.setColor(newColor);
}

function feedback(user, text) {
    serverUser.send("PONG", user);
}

function sendUserList(user, text) {
    var names = _.pluck(users.getUsers(), "name").join(', ');
    serverUser.send(names, user);
}

function userQuit(user, text) {
    user.quit();
}