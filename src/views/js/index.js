const socket = io({
    auth: {
        token: 'brownini' // connection token here!
    }
});

// Listen any error returned by the middleware.
socket.on('connect_error', err => {
    console.log('Connection error');
    console.log(err.message);
    console.log(err.data.details);
})
