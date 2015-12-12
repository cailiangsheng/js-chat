var _ = require('underscore');
var events = require('../common/chat-events');
var ChatUser = require('./chat-user');

var server = new ChatUser(null, 'Server', 'yellow');
var users = [];

events.emitter.on(events.SOCKET_CONNECT, createUser);
events.emitter.on(events.SOCKET_DISCONNECT, removeUser);

module.exports = {
    server: server,
    getUser: getUser,
    getUsers: getUsers
}

function createUser(socket) {
    var user = new ChatUser(socket);
    users.push(user);
    events.emitter.emit(events.USER_ADDED, user);
}

function removeUser(socket) {
    var user = getUser(socket);
    users = _.without(users, user);
    events.emitter.emit(events.USER_REMOVED, user);
}

function getUser(socket) {
    return socket ? _.find(users, function (user) {
        return user.socket == socket;
    }) : server;
}

function getUsers(properties) {
    return _.where(users, properties);
}