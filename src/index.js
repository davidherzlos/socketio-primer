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
});

// Listen 'is connected' event.
io.on('connection', socket => {
    socket.on('is connected', msg => {
        console.log(msg);
    });
});

// Listen for server connections.
httpServer.listen(3000);
