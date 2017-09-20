import $ from 'jquery';
import events from './chat-events';

import React from 'react';
import { render } from 'react-dom';
import ChatView from './chat-view';

let connectedSocket;
let chatView;

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
  chatView = render(
        <ChatView onSend={handleSend} />,
        document.querySelector('#view')
    );
}

function handleSend() {
    const text = chatView.text();
    if (connectedSocket && text) {
        connectedSocket.send(text);
        chatView.text('');
    }
}

function handleSocketConnnect(socket) {
    console.log('\nConnected to server\n');
    connectedSocket = socket;
}

function handleSocketDisconnect(socket) {
    console.log('\nDisconnected from server\n');
    connectedSocket = null;
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