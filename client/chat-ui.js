var colors = require('colors');
var events = require('../common/chat-events');

module.exports = {
    handleEvents: handleEvents
};

function handleEvents() {
    events.on(events.SOCKET_CONNECT, handleSocketConnnect);
    events.on(events.SOCKET_DISCONNECT, handleSocketDisconnect);
    events.on(events.MESSAGE_RECEIVED, handleReceivedMessage);
}

function handleSocketConnnect(socket) {
    console.log('\nConnected to server\n');
    process.stdin.pipe(socket);
}

function handleSocketDisconnect(socket) {
    console.log('\nDisconnected from server\n');
    process.exit();
}

function handleReceivedMessage(socket, message) {
    var obj = JSON.parse(message);
    var timestamp = parseInt(obj.timestamp);
    var time = '[' + new Date(timestamp).toLocaleTimeString() + '] ';
    var user = obj.name ? obj.name + ': ' : "";
    var text = time + user + obj.message;
    var colorText = obj.color ? (text[obj.color] || text) : text;
    console.log('\n' + colorText + '\n');
}