const socket = io();

// Connection events.

// Hay un monton de eventos de conexion que se pueden detectar,
// tanto de lado del cliente como del lado del servidor!


socket.on('connect', () => {
    console.log('socket was connected');
})

socket.on('disconnect', () => {
    console.log('socket was disconnected');
})

socket.io.on('reconnect_attempt', () => {
    console.log('attempting to reconnect');
})

socket.io.on('reconnect', () => {
    console.log('reconnected!');
})
