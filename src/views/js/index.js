const user = prompt('Type your username');
const teachers = ['Marx', 'Engels', 'Lenin'];

let socketNamespace, group;

const chat = document.querySelector('#chat');
const namespace = document.querySelector('#namespace');

// IO can receive a namespace as parameter.
if (teachers.includes(user)) {
    socketNamespace = io('/teachers');
    group = 'teachers';
} else {
    socketNamespace = io('/students');
    group = 'students';
}

// We listen the connect event to update the group.
socketNamespace.on('connect', () => {
    namespace.textContent = group;
});

// Sending messages to the server.
const sendMessage = document.querySelector('#sendMessage');
sendMessage.addEventListener('click', () => {
    const message = prompt('Type your message');
    socketNamespace.emit('send-message', {
        message,
        user
    });
});

// We listen the connection to post the message to the target group.
socketNamespace.on('message', messageData => {
    const { user, message } = messageData;
    const li = document. createElement('li');
    li.textContent = `${user}: ${message}`;
    chat.append(li);
});
