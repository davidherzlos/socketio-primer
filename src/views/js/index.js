const socket = io();

const send = document.querySelector('#send');
const disconnect = document.querySelector('#disconnect');
const reconnect = document.querySelector('#reconnect');

// Just a little closure for a counter.
const counter = (() => {
    let counter = 0;
    return () => {
        counter += 1;
        return counter;
    };
})();

// A litte feature flag for testing.
const controlEvents = false;

// Send 'is connected' event.
send.addEventListener('click', () => {
    // If the client is not connected, the events are buffered so they
    // are by default emitted when the connection is back. That can overhead
    // the app if there are many events and many clients. So we need to
    // check if the socked is connected we only emit if the connection
    // is on.

    // Option one: connected attr checking.
    if (socket.connected && controlEvents) {
        socket.emit('is connected', 'You are connected!! ' + counter());
        return;
    }

    // Option two: volatile events (more succint).
    // Volatile events allows emitting only is connection is on.
    if (controlEvents) {
        socket.volatile.emit('is connected', 'You are connected!! ' + counter());
        return;
    }

    // Emit by default if no 'buffer' contention technique is used.
    if (!controlEvents) {
        socket.emit('is connected', 'You are connected!! ' + counter());
        return;
    }

});

// Send 'disconnect' event manually.
disconnect.addEventListener('click', () => {
    socket.disconnect();
});

// Send 'connected' event manually.
reconnect.addEventListener('click', () => {
    socket.connect();
});
