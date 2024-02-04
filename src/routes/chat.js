import { socket } from "$lib/webSocketConnection.js";
import { get, writable } from "svelte/store";
import { reciever } from "./socket.js";

export let messages = writable([]);

socket.on('message', (message) => {
    messages.update((mess) => [...mess, message]);
});

socket.on('private message', (message) => {
    messages.update((mess) => [...mess, message]);
});

export function sendMessage(text) {
    const message = text.trim();
    if (!message) return;

    if (get(reciever) === "all") {
        socket.emit('message', message);
    } else {
        socket.emit('private message', {
            to: get(reciever).userID,
            message: message
        });
    }
    text = "";
}

socket.on("user connected", (data) => {
    messages.update((mess) => [...mess, data.message]);
});

socket.on("user disconnected", (message) => {
    messages.update((mess) => [...mess, message]);
});