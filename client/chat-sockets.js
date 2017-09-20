import $ from 'jquery';
import _ from 'underscore';
import events from './chat-events';

const sockets = [];

export default {
    monitor,
    sockets,
    socket
};

function socket() {
    return _.first(sockets);
}

function monitor(socket) {
    handleConnecting(socket);
}

function handleConnecting(socket) {
    $(socket).on('open', () => {
        sockets.push(socket);
        events.emit(events.SOCKET_CONNECT, socket);

        handleMessage(socket);
        handleDisconnecting(socket);
    });
}

function handleMessage(socket) {
    $(socket).on('message', event => {
        events.emit(events.MESSAGE_RECEIVED, socket, event.originalEvent.data);
    });
}

function handleDisconnecting(socket) {
    $(socket)
        .on('close', onDisconnect)
        .on('error', onDisconnect);

    function onDisconnect() {
        const index = sockets.indexOf(socket);
        sockets.splice(index, 1);
        events.emit(events.SOCKET_DISCONNECT, socket);
    }
}
