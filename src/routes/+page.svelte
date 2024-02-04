<script>
    import { socket, connect, socketStatus } from "$lib/webSocketConnection.js";
    import { username, reciever } from "./socket.js";
    import Chat from "./chat.svelte";
    import Users from "./users.svelte";

    let user = username;
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<form>
    <input type="text" placeholder="Enter your name" bind:value={user} />
    {#if !$socketStatus}
        <button on:click={() => connect(user)}>Connect</button>
    {:else}
        <button on:click={() => socket.emit("nameChange", username)}
            >Change Name</button
        >
    {/if}
</form>

{#if $socketStatus}
    <Users />
{/if}

{#if $socketStatus}
    <Chat reciever={reciever} />
{/if}
