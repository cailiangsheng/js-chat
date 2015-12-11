
module.exports = ChatUser;

function ChatUser(socket, name, color) {
    this.socket = socket;
    this.name = name;
    this.color = color;
}