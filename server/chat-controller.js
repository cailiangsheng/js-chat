var events = require('./chat-events');
var serverUser = require('./chat-user').serverUser;
var users = require('./chat-users');
var commands = require('./chat-commands');

module.exports = {
    handleEvents: handleEvents
}

function handleEvents() {
    events.on(events.MESSAGE_RECEIVED, onMessageReceived);
    events.on(events.USER_ADDED, onUserAdded);
    events.on(events.USER_REMOVED, onUserRemoved);
    events.on(events.USER_NAME_CHANGED, onUserNameChanged);
    events.on(events.USER_COLOR_CHANGED, onUserColorChanged);
}

function onMessageReceived(fromSocket, message) {
    message = message.trim();

    if (!message) return;

    var user = users.getUser(fromSocket);
    if (commands.isCommand(message)) {
        commands.execute(message, user);
    }
    else {
        user.broadcast(message, user);
    }
}

function onUserAdded(user) {
    serverUser.broadcast(user.name + ' enter the chat', user);
    serverUser.send('You enter the chat with name ' + user.name, user);
}

function onUserRemoved(user) {
    serverUser.broadcast(user.name + ' left the chat', user);
}

function onUserNameChanged(user, oldName) {
    serverUser.broadcast(oldName + ' changed his name to ' + user.name, user);
    serverUser.send('You changed your name from ' + oldName + ' to ' + user.name, user);
}

function onUserColorChanged(user, oldColor) {
    serverUser.send('You changed your color from ' + oldColor + ' to ' + user.color, user);
}