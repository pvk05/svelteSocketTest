<script>
    import { writable, get } from "svelte/store";
    import { socket } from "$lib/webSocketConnection.js";
    import { userList } from "./users.js";
</script>

<ul>
    {#each $userList as user}
        <li>{user.username}</li>
    {/each}
</ul>
