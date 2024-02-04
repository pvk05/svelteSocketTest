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

        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                username: socket.username
            });
        }
        socket.emit("users", users);

        socket.broadcast.emit('user connected', {
            user: {
                userID: socket.id,
                username: socket.username
            },
            message: {
                from: "System",
                message: `${socket.username} has joined the chat`,
                time: new Date().toLocaleString()
            }
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

        socket.on('private message', ({ to, message }) => {
            socket.to(to).emit('private message', {
                from: socket.username,
                message: message,
                time: new Date().toLocaleString()
            });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id, socket.username);
            io.emit('user disconnected', {
                from: "System",
                message: `${socket.username} has left the chat`,
                time: new Date().toLocaleString()
            });
        });
    });

    console.log('SocketIO injected');
}