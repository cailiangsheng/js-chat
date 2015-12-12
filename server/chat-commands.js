var _ = require('underscore');
var users = require('./chat-users');
var messenger = require('./chat-messenger');
var commands = {
    '/name': changeUserName,
    '/color': changeUserColor,
    '/ping': feedback,
    '/list': sendUserList,
    '/quit': disconnect
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

function execute(fromSocket, message) {
    var command = getCommand(message);
    if (command) {
        var text = command.text;
        command.handler(fromSocket, text);
    }
}

function changeUserName(fromSocket, text) {
    var newName = text;
    users.getUser(fromSocket).setName(newName);
}

function changeUserColor(fromSocket, text) {
    var newColor = text;
    users.getUser(fromSocket).setColor(newColor);
}

function feedback(fromSocket, text) {
    messenger.send(fromSocket, null, "PONG");
}

function sendUserList(fromSocket, text) {
    var names = _.pluck(users.getUsers(), "name").join(', ');
    messenger.send(fromSocket, null, names);
}

function disconnect(fromSocket, text) {
    fromSocket.end();
}