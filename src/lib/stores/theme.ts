import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'everforest' | 'gruvbox' | 'minimalist';
export type Mode = 'light' | 'dark';

// Default settings
const defaultTheme: Theme = 'everforest';
const defaultMode: Mode = 'dark';

// Create stores
export const theme = writable<Theme>(defaultTheme);
export const mode = writable<Mode>(defaultMode);

// Initialize from localStorage if available
if (browser) {
    const storedTheme = localStorage.getItem('tane-theme') as Theme;
    if (storedTheme && ['everforest', 'gruvbox', 'minimalist'].includes(storedTheme)) {
        theme.set(storedTheme);
    }

    const storedMode = localStorage.getItem('tane-mode') as Mode;
    if (storedMode && ['light', 'dark'].includes(storedMode)) {
        mode.set(storedMode);
    }

    // Subscribe to changes to update DOM and localStorage
    theme.subscribe((value) => {
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem('tane-theme', value);
    });

    mode.subscribe((value) => {
        if (value === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('tane-mode', value);
    });
}
