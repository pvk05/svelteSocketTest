<script>
    import  io  from "socket.io-client";
    import Chat from "./socket.svelte";
    import { writable } from "svelte/store";

    let socket = io({ autoConnect: false });
    let username = "";
    let socketStatus = writable(false);

    function connect() {
        console.log("connecting");
        socket.connect();
        socket.on("connect", () => {
            console.log("connected");
            socketStatus.set(true);
        });
        console.log($socketStatus)
        socket.emit("login", username);
    }

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form >
    <input type="text" placeholder="Enter your name" bind:value={username}/>
    {#if !$socketStatus}
        <button on:click={connect}>Connect</button>
    {:else}
        <button on:click={() => socket.emit("nameChange", username)}>Change Name</button>
    {/if}
    
</form>

{#if $socketStatus}
    <Chat socket={socket}/>
{/if}