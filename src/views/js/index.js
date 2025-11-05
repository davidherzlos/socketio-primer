const socket = io();

// Create a dragable circle.
const circle = document.querySelector("#circle");

document.addEventListener("mousedown", e => {
    document.addEventListener("mousemove", drag);
});

document.addEventListener("click", e => {
    document.removeEventListener("mousemove", drag);
});

// Utility function to draw the new position.
const drawCircle = position => {
    circle.style.top = position.top;
    circle.style.left = position.left;
};

// When the moved, update position locally and notify server.
const drag = e => {
    const position = {
        top: e.clientY + "px",
        left: e.clientX + "px"
    };
    drawCircle(position);
    socket.emit('move-circle', position);
};

// If I moved the circle, I will not be notified here.
socket.on('move-circle-all', position => {
    drawCircle(position);
});

