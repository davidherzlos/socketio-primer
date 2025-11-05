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

// Listen for socket connections.
io.on('connection', socket => {
    socket.connectedRoom = '';
    socket.on('connect to room', room => {

        // In case we want to force the user to leave the connected room:
        const onlyOneRoomPerUser = false;
        if (onlyOneRoomPerUser) {
            socket.leave(socket.connectedRoom);
        }

        switch (room) {
            case 'room1':
                socket.join('room1');
                socket.connectedRoom = 'room1';
                console.log(socket.connectedRoom);
                break;
            case 'room2':
                socket.join('room2');
                socket.connectedRoom = 'room2';
                console.log(socket.connectedRoom);
                break;
            case 'room3':
                socket.join('room3');
                socket.connectedRoom = 'room3';
                console.log(socket.connectedRoom);
                break;
            default:
                break;
        }
    })
    socket.on('message', message => {
        const room = socket.connectedRoom;
        io.to(room).emit('send message', {
            message,
            room
        })
    })
});

// Listen for server connections.
httpServer.listen(3000);
