import $ from 'jquery';
import events from './chat-events';

import React from 'react';
import { render } from 'react-dom';
import ChatView from './chat-view';

export default {
    handleEvents
};

function handleEvents() {
    $(document).ready(initView);

    events.on(events.SOCKET_CONNECT, handleSocketConnnect);
    events.on(events.SOCKET_DISCONNECT, handleSocketDisconnect);
    events.on(events.MESSAGE_RECEIVED, handleReceivedMessage);
}

function initView() {
  render(<ChatView />, document.querySelector('#view'));
}

function handleSocketConnnect(socket) {
    console.log('\nConnected to server\n');

    $('.btnSend').click(() => {
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