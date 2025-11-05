const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');

// Web server.
const app = express();
const httpServer = createServer(app);

// Sockets server.
const io = new Server(httpServer);

// Config express path for statics.
app.use(express.static(path.join(__dirname, 'views')));

// Dispatch routes (express).
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

// Listen for socket connections.
io.on('connection', socket => {

    // Emit the welcome event to the client.
    socket.emit('welcome', 'You are connected 😀');

    // Listen thanks event emitted from the client.
    socket.on('thanks', data => {
        console.log(data);
    })

    // Listen hi event emitted from the client and emitted back to all.
    socket.on('hitoall', data => {
        io.emit('replytoall', data + ' ' + socket.id);
    })

})

// Listen for server connections.
httpServer.listen(3000);
