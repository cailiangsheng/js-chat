var colors = require('colors');
var events = require('../common/chat-events');

var SERVER_COLOR = 'yellow';
var USER_DEFAULT_COLOR = 'grey';

var userCount = 0;
var serverUser = new ChatUser(null, null, SERVER_COLOR);

module.exports = {
    createUser: createUser,
    serverUser: serverUser
};

function createUser(socket, name, color) {
    return new ChatUser(
        socket,
        name || 'User' + (++userCount),
        color || USER_DEFAULT_COLOR
    );
}

function ChatUser(socket, name, color) {
    this.socket = socket;
    this.name = name;
    this.color = color;
}

ChatUser.prototype.setName = function (name) {
    if (this.name != name && name) {
        var oldName = this.name;
        this.name = name;
        events.emitter.emit(events.USER_NAME_CHANGED, this, oldName);
    }
}

ChatUser.prototype.setColor = function (color) {
    if (this.color != color && isValidColor(color)) {
        var oldColor = this.color;
        this.color = color;
        events.emitter.emit(events.USER_COLOR_CHANGED, this, oldColor);
    }
}

function isValidColor(color) {
    return "test"[color] != undefined;
}