import { socket } from "$lib/webSocketConnection.js";
import { writable } from "svelte/store";

export let userList = writable();

socket.on("user connected", (user) => {
    userList.update((users) => [...users, user]);
});

socket.on("users", (users) => {
    //console.log(users)
    users.forEach((user) => {
        user.self = user.userID === socket.userID;
    });

    users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
    });
    userList.set(users);
});