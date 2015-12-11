var users = require('./chat-users');
var messenger = require('./chat-messenger');
var commands = {
    '/name': renameUser,
    '/ping': feedback,
    '/list': sendUserList,
    '/quit': disconnect
};

module.exports = {
    isCommand: getHandler,
    execute: execute
};

function getHandler(message) {
    var msg = message.trim().toLowerCase();
    return _.find(commands, function (value, key) {
        return msg.indexOf(key + ' ') == 0;
    });
}

function execute(fromSocket, message, timestamp) {
    var handler = getHandler(message);
    if (handler) {
        var text = message.substr(5).trim();
        handler(fromSocket, text, timestamp);
    }
}

function renameUser(fromSocket, text, timestamp) {
    var newName = text;
    users.getUser(fromSocket).name = newName;
}

function feedback(fromSocket, text, timestamp) {
    messenger.send(fromSocket, null, "PONG", timestamp);
}

function sendUserList(fromSocket, text, timestamp) {
    var names = _.pluck(users.getUsers(), "name").join('\n');
    messenger.send(fromSocket, null, names, timestamp);
}

function disconnect(fromSocket, text, timestamp) {
    fromSocket.disconnect();
}