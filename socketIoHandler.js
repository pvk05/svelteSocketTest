import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server, {
        cors: {
            origin: ["https://sveltesockettest.onrender.com/", `http://localhost:${process.env.PORT || 3000}`]
        }
    });

    io.on('connection', (socket) => {

        let username = "";
        socket.on('login', (name) => {
            username = name;
            io.emit('message', {
                from: 'System',
                message: `${username} has joined the chat`,
                time: new Date().toLocaleString()
            });
        });
        socket.on("nameChange", (name) => {
            io.emit('message', {
                from: 'System',
                message: `${username} has changed their name to ${name}`,
                time: new Date().toLocaleString()
            });
            username = name;
        });

        socket.on('message', (message) => {
            io.emit('message', {
                from: username,
                message: message,
                time: new Date().toLocaleString()
            });
        });
    });

    console.log('SocketIO injected');
}