import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server, {
        cors: {
            origin: ["https://sveltesockettest.onrender.com/", `http://localhost:${process.env.PORT || 3000}`]
        }
    });

    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("Invalid username"));
        }
        socket.username = username;
        next();
    })

    io.on('connect', (socket) => {
        console.log('User connected', socket.id, socket.username);
        socket.emit("hello", "world");
        socket.send("Hello, world!");
        
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                username: socket.username
            });
        }
        socket.emit("users", users);

        socket.broadcast.emit('user connected', {
            userID: socket.id,
            username: socket.username
        });

        /*let username = "";
        socket.on('login', (name) => {
            username = name;
            io.emit('message', {
                from: 'System',
                message: `${username} has joined the chat`,
                time: new Date().toLocaleString()
            });
        });*/
        /*socket.on("nameChange", (name) => {
            io.emit('message', {
                from: 'System',
                message: ` has changed their name to ${name}`,
                time: new Date().toLocaleString()
            });
            username = name;
        });*/

        socket.on('message', (message) => {
            io.emit('message', {
                from: socket.username,
                message: message,
                time: new Date().toLocaleString()
            });
        });
    });

    console.log('SocketIO injected');
}