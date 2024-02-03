import io from 'socket.io-client';
import { writable } from 'svelte/store';
const ENDPOINT = `http://localhost:3000`;

export const socket = io(ENDPOINT, { autoConnect: false });
export let socketStatus = writable(false);

export function connect(username) {
    //usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
    socket.on("connect", () => {
        console.log("Connected to server");
        socketStatus.set(true);
    });
}