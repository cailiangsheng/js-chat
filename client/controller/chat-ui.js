var events = require('../model/chat-events');

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

    $('.btnSend').click(function () {
        var $txtSend = $('.txtSend');
        var text = $txtSend.val();
        socket.send(text);
        $txtSend.val('');
    })
}

function handleSocketDisconnect(socket) {
    console.log('\nDisconnected from server\n');
}

function handleReceivedMessage(socket, message) {
    var obj = JSON.parse(message);
    var timestamp = parseInt(obj.timestamp);
    var time = '[' + new Date(timestamp).toLocaleTimeString() + '] ';
    var user = obj.name ? obj.name + ': ' : "";
    var text = time + user + obj.message;
    var color = obj.color;
    $('.txtReceived').append(`<span style="color:${color}">${text}</span><br>`);
}