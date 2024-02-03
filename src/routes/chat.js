import { socket } from "$lib/webSocketConnection.js";
import { writable } from "svelte/store";

export let messages = writable();

socket.on('message', (message) => {
    messages.update((mess) => [...mess, message]);
});

export function sendMessage(text) {
    const message = text.trim();
    if (!message) return;

    text = '';
    socket.emit('message', message);
}