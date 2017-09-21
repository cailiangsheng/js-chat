var events = require('./chat-events');
var messenger = require('./chat-messenger');

var SERVER_COLOR = 'yellow';
var USER_DEFAULT_COLOR = 'grey';

var userCount = 0;
var serverUser = new ChatUser(null, null, SERVER_COLOR);

var colors = ['red', 'green', 'white', 'blue'];

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
        events.emit(events.USER_NAME_CHANGED, this, oldName);
    }
}

ChatUser.prototype.setColor = function (color) {
    if (this.color != color && isValidColor(color)) {
        var oldColor = this.color;
        this.color = color;
        events.emit(events.USER_COLOR_CHANGED, this, oldColor);
    }
}

function isValidColor(color) {
    return color && colors.indexOf(color.toLowerCase()) >= 0;
}

ChatUser.prototype.encodeMessage = function (message, toUser) {
    var timestamp = new Date().getTime();
    var json = JSON.stringify({
        name: this.name,
        color: this.color,
        message: message,
        timestamp: timestamp
    });

    return json;
}

ChatUser.prototype.send = function (message, toUser) {
    var userMessage = this.encodeMessage(message);
    messenger.send(userMessage, toUser.socket);
}

ChatUser.prototype.broadcast = function (message, exceptUser) {
    //exceptUser = exceptUser || this;

    var userMessage = this.encodeMessage(message);
    var exceptSocket = exceptUser ? exceptUser.socket : null;
    messenger.broadcast(userMessage, exceptSocket);
}

ChatUser.prototype.quit = function () {
    serverUser.send('Goodbye ' + this.name, this);

    if (this.socket) {
        this.socket.close();
    }
}