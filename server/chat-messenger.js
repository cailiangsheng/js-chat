var _ = require('underscore');
var users = require('./chat-users');

module.exports= {
    send: send,
    sendTo: sendTo,
    broadcast: broadcast
};

function broadcast(fromSocket, message, timestamp) {
    sendTo(null, fromSocket, message, timestamp);
}

function sendTo(userName, fromSocket, message, timestamp) {
    var properties = userName ? {name: userName} : null;
    var toUsers = users.getUsers(properties);
    _.forEach(toUsers, function (user) {
        send(user.socket, fromSocket, message, timestamp);
    });
}

function send(toSocket, fromSocket, message, timestamp) {
    if (toSocket) {
        toSocket.write(encodeMessage(fromSocket, message, timestamp));
    }
}

function encodeMessage(fromSocket, message, timestamp) {
    var fromUser = users.getUser(fromSocket);
    var json = JSON.stringify({
        name: fromUser.name,
        color: fromUser.color,
        message: message,
        timestamp: timestamp
    });

    return json;
}