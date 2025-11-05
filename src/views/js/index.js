const socket = io();

// Buttons to connect to the rooms.

const connectRoom1 = document.querySelector('#connectRoom1');
const connectRoom2 = document.querySelector('#connectRoom2');
const connectRoom3 = document.querySelector('#connectRoom3');

// Listen clicks in order to emit to the server.

connectRoom1.addEventListener('click', () => {
    socket.emit('connect to room', 'room1');
})

connectRoom2.addEventListener('click', () => {
    socket.emit('connect to room', 'room2');
})

connectRoom3.addEventListener('click', () => {
    socket.emit('connect to room', 'room3');
})

// Send message.
const sendMessage = document.querySelector('#sendMessage');
sendMessage.addEventListener('click', () => {
    const message = prompt('Write your message:');
    socket.emit('message', message);
})

// Receive the message from the server.
socket.on('send message', data => {
    const { message } = data;
    const { room } = data;

    const li = document.createElement('li');
    li.textContent = message;
    document.querySelector('#' + room).append(li);
})
