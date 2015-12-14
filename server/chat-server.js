var net = require('net');
var events = require('../common/chat-events');
var sockets = require('../common/chat-sockets');
var commands = require('./chat-commands');
var messenger = require('./chat-messenger');
var server = null;

module.exports = function (port) {
    handleMessages();
    createChatServer(port);
};

function createChatServer(port) {
    server = net.createServer(sockets.monitor);
    monitor(server);
    server.listen(port);
}

function monitor(server) {
    server.on('listening', function () {
        events.emit(events.SERVER_LISTENING, server);
    });

    server.on('error', function (error) {
        events.emit(events.SERVER_ERROR, server, error);
    });
}

function handleMessages() {
    events.on(events.MESSAGE_RECEIVED, onMessageReceived);
    events.on(events.USER_ADDED, onUserAdded);
    events.on(events.USER_REMOVED, onUserRemoved);
    events.on(events.USER_NAME_CHANGED, onUserNameChanged);
    events.on(events.USER_COLOR_CHANGED, onUserColorChanged);
}

function onMessageReceived(fromSocket, message) {
    message = message.trim();

    if (!message) return;

    if (commands.isCommand(message)) {
        commands.execute(fromSocket, message);
    }
    else {
        messenger.broadcast(fromSocket, message, fromSocket);
    }
}

function onUserAdded(user) {
    messenger.broadcast(null, user.name + ' enter the chat', user.socket);
    messenger.send(user.socket, null, 'You enter the chat with name ' + user.name);
}

function onUserRemoved(user) {
    messenger.broadcast(null, user.name + ' left the chat', user.socket);
}

function onUserNameChanged(user, oldName) {
    messenger.broadcast(null, oldName + ' changed his name to ' + user.name, user.socket);
    messenger.send(user.socket, null, 'You changed your name from ' + oldName + ' to ' + user.name);
}

function onUserColorChanged(user, oldColor) {
    messenger.send(user.socket, null, 'You changed your color from ' + oldColor + ' to ' + user.color);
}
