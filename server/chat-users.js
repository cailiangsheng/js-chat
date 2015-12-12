var _ = require('underscore');
var events = require('../common/chat-events');
var user = require('./chat-user');

var users = [];

events.emitter.on(events.SOCKET_CONNECT, createUser);
events.emitter.on(events.SOCKET_DISCONNECT, removeUser);

module.exports = {
    getUser: getUser,
    getUsers: getUsers
}

function createUser(socket) {
    var newUser = user.createUser(socket);
    users.push(newUser);
    events.emitter.emit(events.USER_ADDED, newUser);
}

function removeUser(socket) {
    var user = getUser(socket);
    users = _.without(users, user);
    events.emitter.emit(events.USER_REMOVED, user);
}

function getUser(socket) {
    return socket ? _.find(users, function (user) {
        return user.socket == socket;
    }) : user.serverUser;
}

function getUsers(properties) {
    return _.where(users, properties);
}