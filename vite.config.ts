import tailwindcss from
'@tailwindcss/vite';
import react from
'@vitejs/plugin-react';
import path from 'path';
import {
defineConfig
} from 'vite';
import {
VitePWA
} from 'vite-plugin-pwa';

// set up vite config for pwa
// we pack all assets for offline run
export default defineConfig(
() => {
return {
plugins: [
react(),
tailwindcss(),
VitePWA({
registerType: 'autoUpdate',
includeAssets: [
'favicon.ico',
'apple-touch-icon.png',
'icon.svg'
],
manifest: {
id: '/',
name: 'Forkmaster',
short_name: 'Forkmaster',
description:
'Local git branch viewer.',
theme_color: '#274566',
background_color: '#ffffff',
display: 'standalone',
start_url: '/',
scope: '/',
icons: [
{
src: '/pwa-192x192.png',
sizes: '192x192',
type: 'image/png',
purpose: 'any',
},
{
src: '/pwa-512x512.png',
sizes: '512x512',
type: 'image/png',
purpose: 'any',
},
{
src:
'/pwa-maskable-512x512.png',
sizes: '512x512',
type: 'image/png',
purpose: 'maskable',
},
],
},
workbox: {
globPatterns: [
'**/*.{js,css,html,ico,png,svg}'
],
},
devOptions: {
enabled: true,
type: 'module',
},
})
],
resolve: {
alias: {
'@': path.resolve(
__dirname,
'.'
),
},
},
server: {
hmr:
process.env.DISABLE_HMR !==
'true',
watch:
process.env.DISABLE_HMR ===
'true'
? null
: {},
},
};
}
);
