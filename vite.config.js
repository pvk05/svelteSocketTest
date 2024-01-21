import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { webSocketServer } from './webSocketPluginVite.js';

export default defineConfig({
	server: {
        port: 3000
    },
    preview: {
        port: 3000
    },
	plugins: [sveltekit(), webSocketServer]
});
