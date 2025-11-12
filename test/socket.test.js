const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

describe('Testing Socket.io', () => {

    let io, serverSocket, clientSocket;

    // Create the server before running any tests.
    beforeAll(done => {
        const httpServer = createServer();
        io = new Server(httpServer);

        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client('http://localhost' + ':' + port);

            io.on('connection', socket => {
                serverSocket = socket;
            });

            clientSocket.on('connect', done);
        });
    });

    // Close the servers after every test end.
    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    // Test cases.
    test('Test event', done => {
        clientSocket.on('greeting', greet => {
            expect(greet).toBe('Holi');
            done();
        });
        serverSocket.emit('greeting', 'hola');
    });

});

