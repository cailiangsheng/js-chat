var events = require('./chat-events');

module.exports = {
    enableLogging: enableLogging
};

function enableLogging() {
    events.on(events.SOCKET_CONNECT, onSocketConnect);
    events.on(events.SOCKET_DISCONNECT, onSocketDisconnect);
    events.on(events.MESSAGE_RECEIVED, onMessageReceived);
    events.on(events.SERVER_LISTENING, onServerListening);
    events.on(events.SERVER_ERROR, onServerError);
}

function onSocketConnect() {
    console.log('Socket connected\n');
}

function onSocketDisconnect() {
    console.log('Socket disconnected\n');
}

function onMessageReceived(socket, message) {
    console.log('Message received: ' + message + '\n');
}

function onServerListening(server) {
    var port = server.options.port;
    console.log('Server listening to port: ' + port + '\n');
}

function onServerError(server, error) {
    switch (error.code) {
        case 'EADDRINUSE':
          if (error.syscall == 'listen') {
              console.log('The port for server to listen is already in use\n');
              return;
          }
    }

    console.log('Server', error.toString(), '\n');
}
