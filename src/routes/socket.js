import { socket, socketStatus } from "$lib/webSocketConnection.js";

export let username = "";
//let usernameAlreadySelected = false;
export let userList = [];



/*const sessionID = localStorage.getItem("sessionID");
if (sessionID) {
    usernameAlreadySelected = true;
    socket.auth = { sessionID };
    socket.connect();
    socket.on("connect", () => {
        socketStatus.set(true);
    });
}

socket.on("session", ({ sessionID, userID }) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID);
    // save the ID of the user
    socket.userID = userID;
});*/

socket.on("connect_error", (err) => {
    if (err.message === "Invalid username") {
        //usernameAlreadySelected = false;
        socketStatus.set(false);
    }
});




export function connect() {
    //usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
    socket.on("connect", () => {
        socketStatus.set(true);
    });
}