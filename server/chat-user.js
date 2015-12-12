
var userCount = 0;

module.exports = ChatUser;

function ChatUser(socket, name, color) {
    this.socket = socket;
    this.name = name || 'User' + (++userCount);
    this.color = color;
}