var _ = require('underscore');
var sockets = require('./chat-sockets');

module.exports = {
    send: send,
    broadcast: broadcast
};

function send(message, toSocket) {
    if (toSocket) {
        toSocket.send(message);
    }
}

function broadcast(message, exceptSocket) {
    var toSockets = _.without(sockets.sockets, exceptSocket);
    _.each(toSockets, function (toSocket) {
        send(message, toSocket);
    })
}