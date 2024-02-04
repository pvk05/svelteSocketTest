<script>
    import { writable, get } from "svelte/store";
    import { socket } from "$lib/webSocketConnection.js";
    import { userList, changeUser } from "./users.js";
</script>

<ul>
    {#each $userList as user}
        <li><button on:click={() => changeUser(user.userID)}>{user.username}</button></li>
    {/each}
</ul>
