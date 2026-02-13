<script lang="ts">
import { Check, Moon, Palette, Sun } from 'lucide-svelte';
import { fade, slide } from 'svelte/transition';
import { type Mode, mode, type Theme, theme } from '$lib/stores/theme';

let isOpen = $state(false);

const themes: { id: Theme; label: string; color: string }[] = [
	{ id: 'everforest', label: 'Everforest', color: '#a7c080' },
	{ id: 'gruvbox', label: 'Gruvbox', color: '#fe8019' },
	{ id: 'minimalist', label: 'Minimalist', color: '#10b981' },
];

function toggleMode() {
	mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
}

function selectTheme(t: Theme) {
	theme.set(t);
}
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col items-end">
    <!-- Main Toggle Button -->
    <button 
        onclick={() => isOpen = !isOpen}
        class="p-2 rounded-full bg-[var(--color-paper-warm-dark)] shadow-md border border-[var(--color-ink-light)]/20 text-[var(--color-ink-light)] hover:text-[var(--sage-fresh)] transition-colors"
        aria-label="Theme Settings"
    >
        <Palette class="w-5 h-5" />
    </button>

    <!-- Dropdown Panel -->
    {#if isOpen}
        <!-- Backdrop to close -->
        <div 
            class="fixed inset-0 z-40 bg-transparent cursor-default" 
            onclick={() => isOpen = false}
            role="presentation"
        ></div>

        <div 
            transition:slide={{ duration: 200, axis: 'y' }}
            class="relative z-50 mt-2 bg-[var(--color-paper-warm-dark)] border border-[var(--color-ink-light)]/20 rounded-xl shadow-xl p-4 w-48 flex flex-col gap-4"
        >
            <!-- Mode Toggle -->
            <div class="flex items-center justify-between">
                <span class="text-sm font-serif opacity-70">Mode</span>
                <button 
                    onclick={toggleMode}
                    class="p-1.5 rounded-lg bg-[var(--color-paper-dark)] hover:text-[var(--sage-fresh)] transition-colors"
                >
                    {#if $mode === 'dark'}
                        <Moon class="w-4 h-4" />
                    {:else}
                        <Sun class="w-4 h-4" />
                    {/if}
                </button>
            </div>

            <div class="h-px bg-[var(--color-ink-light)]/10 w-full"></div>

            <!-- Theme Selection -->
            <div class="flex flex-col gap-2">
                <span class="text-sm font-serif opacity-70">Theme</span>
                {#each themes as t}
                    <button 
                        onclick={() => selectTheme(t.id)}
                        class="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[var(--color-paper-dark)] text-left transition-colors group"
                    >
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: {t.color}"></div>
                            <span class="text-sm font-serif">
                                {t.label}
                            </span>
                        </div>
                        {#if $theme === t.id}
                            <Check class="w-3 h-3 text-[var(--sage-fresh)]" />
                        {/if}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</div>
