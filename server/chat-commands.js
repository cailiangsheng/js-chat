var _ = require('underscore');
var users = require('./chat-users');
var messenger = require('./chat-messenger');
var commands = {
    '/name': renameUser,
    '/ping': feedback,
    '/list': sendUserList,
    '/quit': disconnect
};

module.exports = {
    isCommand: getCommand,
    execute: execute
};

function getRegExp(command) {
    return new RegExp('^\\s*(\\' + command + ')\\s+(.*)\\s*$', 'i');
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

function execute(fromSocket, message, timestamp) {
    var command = getCommand(message);
    if (command) {console.log(JSON.stringify(command));
        var text = command.text;
        command.handler(fromSocket, text, timestamp);
    }
}

function renameUser(fromSocket, text, timestamp) {
    var newName = text;
    if (newName) {
        users.getUser(fromSocket).name = newName;
    }
}

function feedback(fromSocket, text, timestamp) {
    messenger.send(fromSocket, null, "PONG", timestamp);
}

function sendUserList(fromSocket, text, timestamp) {
    var names = _.pluck(users.getUsers(), "name").join('\n');
    messenger.send(fromSocket, null, names, timestamp);
}

function disconnect(fromSocket, text, timestamp) {
    fromSocket.end();
}