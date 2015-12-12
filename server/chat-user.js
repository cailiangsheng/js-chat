var colors = require('colors');
var events = require('../common/chat-events');
var userCount = 0;

module.exports = ChatUser;

function ChatUser(socket, name, color) {
    this.socket = socket;
    this.name = name || 'User' + (++userCount);
    this.color = color || 'grey';
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