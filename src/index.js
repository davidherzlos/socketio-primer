const path = require('path');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Web server.
const app = express();
const httpServer = createServer(app);

// Sockets server.
const io = new Server(httpServer);

// Config express to set the path for statics.
app.use(express.static(path.join(__dirname, 'views')));

// Dispatch routes (express server).
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

// Listen for socket connection (sockets).
io.on('connection', socket => {
    console.log(socket);
})

// Listen for server connections.
httpServer.lister();
