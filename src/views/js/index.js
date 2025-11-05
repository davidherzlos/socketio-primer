const socket = io();

// Listen welcome event emitted from the server.
socket.on('welcome', data => {
    document.querySelector('#welcomemsg').textContent = data;
})

// Emit the thanks event to the server.
document.querySelector('#thanksmsg').addEventListener('click', () => {
    socket.emit('thanks', 'Hi. Thanks! 😀');
})

// Emit the hi event to the server.
document.querySelector('#sayhi').addEventListener('click', () => {
    socket.emit('hitoall', 'Hi all! 😀');
})

// Listen the hi event back to all from the server.
socket.on('replytoall', data => {
    document.querySelector('#hitoallmsg').append('</br>' + data);
})
