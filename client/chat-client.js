var colors = require('colors');
var net = require('net');
var events = require('../common/chat-events');
var sockets = require('../common/chat-sockets');
var client = null;

module.exports = function (host, port) {
    handleMessages();
    createChatClient(host, port);
}

function createChatClient(host, port) {
    var options = {host: host, port: port};
    client = net.connect(options);
    sockets.monitor(client);
}

function handleMessages() {
    events.emitter.on(events.SOCKET_CONNECT, handleSocketConnnect);
    events.emitter.on(events.SOCKET_DISCONNECT, handleSocketDisconnect);
    events.emitter.on(events.MESSAGE_RECEIVED, handleReceivedMessage);
}

function handleSocketConnnect() {
    console.log('Connected to server');
    process.stdin.pipe(client);
}

function handleSocketDisconnect(socket) {
    console.log('\nDisconnected from server');
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