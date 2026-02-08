import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		host: true, // Listen on all addresses (0.0.0.0)
		port: 5173,
		strictPort: true, // Fail if port is busy
		allowedHosts: true // Allow any host (crucial for Docker/tunnels)
	}
});
