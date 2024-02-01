<script>
    import { io } from "socket.io-client";
    import Chat from "./socket.svelte";

    let socket;
    let username = "";

    function connect() {
        socket = io();
        socket.emit("login", username);
    }

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form >
    <input type="text" placeholder="Enter your name" bind:value={username}/>
    {#if !socket}
        <button on:click={connect}>Connect</button>
    {:else}
        <button on:click={() => socket.emit("nameChange", username)}>Change Name</button>
    {/if}
    
</form>

{#if socket}
    <Chat socket={socket}/>
{/if}