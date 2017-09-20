import $ from 'jquery';
import events from './chat-events';

import React from 'react';
import { render } from 'react-dom';
import ChatView from './chat-view';

let connectedSocket;
let receivedMessages = [];
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
        <ChatView onSend={handleSend} messages={receivedMessages} />,
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
    console.log('\nReceived message from server:', message, '\n');

    receivedMessages.push(message);

    if (chatView) {
        chatView.update();
    }
}