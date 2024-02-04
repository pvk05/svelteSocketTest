import { socket } from "$lib/webSocketConnection.js";
import { get, writable } from "svelte/store";
import { reciever } from "./socket.js";

export let userList = writable();

socket.on("user connected", (data) => {
    userList.update((users) => [...users, data.user]);
});

socket.on("users", (users) => {
    //console.log(users)
    users.forEach((user) => {
        user.self = user.userID === socket.id;
    });

    users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
    });
    userList.set(users);
});

export function changeUser(userID) {
    let user = get(userList).find((user) => user.userID === userID);
    if(user.self) {
        reciever.set("all");
        return;
    }
    reciever.set(get(userList).find((user) => user.userID === userID));
}