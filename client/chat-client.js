import sockets from './chat-sockets';

let client = null;

export default function createChatClient(host, port) {
    client = new WebSocket(`ws://${host}:${port}`);
    sockets.monitor(client);
}