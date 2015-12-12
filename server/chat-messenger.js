var _ = require('underscore');
var users = require('./chat-users');

module.exports= {
    send: send,
    sendTo: sendTo,
    broadcast: broadcast
};

function broadcast(fromSocket, message) {
    sendTo(null, fromSocket, message);
}

function sendTo(userName, fromSocket, message) {
    var properties = userName ? {name: userName} : null;
    var toUsers = users.getUsers(properties);
    _.forEach(toUsers, function (user) {
        send(user.socket, fromSocket, message);
    });
}

function send(toSocket, fromSocket, message) {
    if (toSocket) {
        toSocket.write(encodeMessage(fromSocket, message));
    }
}

function encodeMessage(fromSocket, message) {
    var fromUser = users.getUser(fromSocket);
    var timestamp = new Date().getTime();
    var json = JSON.stringify({
        name: fromUser.name,
        color: fromUser.color,
        message: message,
        timestamp: timestamp
    });

    return json;
}