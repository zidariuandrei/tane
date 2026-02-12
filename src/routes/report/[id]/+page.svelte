<script lang="ts">
import { marked } from 'marked';
import { fade } from 'svelte/transition';
import { enhance } from '$app/forms';
import { onMount } from 'svelte';
import SeedMenu from '$lib/components/SeedMenu.svelte';
import SeedIcon from '$lib/components/SeedIcon.svelte';

let { data } = $props();

let seed = $derived(data.seed);
let report = $derived(data.report);

// Parse markdown on the client side to avoid hydration mismatches if possible, 
// or use simple sync parsing. Marked is sync by default.
let parsedContent = $derived(report ? marked.parse(report.content) : '');
</script>

<div class="min-h-screen bg-[var(--color-paper-dark)] text-[var(--color-ink-light)] font-serif p-8 md:p-12 lg:p-24 flex justify-center">
    
    <!-- Paper Sheet Container -->
    <article class="max-w-4xl w-full bg-[var(--color-paper-warm-dark)] shadow-2xl rounded-sm p-8 md:p-16 relative overflow-hidden z-10" in:fade={{ duration: 600 }}>
        
        <!-- Texture Overlay -->
        <div class="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
             style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E');">
        </div>

        <!-- Action Menu (Restored Functionality) -->
        <div class="relative z-20 -mx-4 -mt-4 mb-8">
            <SeedMenu 
                markdown={report?.content || ''} 
                seedId={seed.id} 
                topic={seed.content} 
            />
        </div>

        <!-- Header -->
        <header class="mb-12 border-b border-[var(--sage-dried)]/30 pb-8 relative z-10 text-center">
            <span class="inline-block px-3 py-1 rounded-full border border-[var(--sage-fresh)] text-[var(--sage-fresh)] text-xs font-bold uppercase tracking-widest mb-4">
                Research Report
            </span>
            <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl text-[var(--color-ink-light)] leading-tight mb-4 break-words">
                {seed.content}
            </h1>
            <p class="text-sm opacity-50 font-serif italic">
                Generated on {new Date(report?.updated_at || Date.now()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </header>

        <!-- Content -->
        {#if report}
            <div class="prose prose-invert prose-lg max-w-none font-serif leading-relaxed text-[var(--color-ink-light)] relative z-10 markdown-content">
                {@html parsedContent}
            </div>
        {:else}
            <div class="flex flex-col items-center justify-center py-24 text-center opacity-60">
                <div class="w-16 h-16 border-4 border-[var(--sage-dried)] border-t-[var(--sage-fresh)] rounded-full animate-spin mb-6"></div>
                <p class="text-xl font-heading text-[var(--sage-fresh)]">Still Growing...</p>
                <p class="mt-2 text-sm italic">The Gardener is researching this seed.</p>
            </div>
        {/if}

        <!-- Footer -->
        <footer class="mt-16 pt-8 border-t border-[var(--sage-dried)]/20 text-center opacity-40 text-sm font-serif italic relative z-10">
            <p>Tane Research Archives • Botanical Intelligence Unit</p>
        </footer>
    </article>

    <!-- Organic Background Plant Illustration (Fixed to Viewport) -->
    <div class="fixed -bottom-12 -right-12 md:-bottom-24 md:-right-24 pointer-events-none opacity-[0.1] z-0 transform rotate-12 origin-bottom-right scale-125 transition-all duration-1000 ease-out">
        <SeedIcon type={seed.plant_type} status="completed" class="w-[300px] h-[300px] md:w-[500px] md:h-[500px] text-[var(--sage-fresh)]" />
    </div>
</div>

<style>
    /* Custom Typography for the Report Content - Herbarium Theme */
    /* Using specific overrides to match SeedMenu's style if needed, but keeping report unique */
    :global(.markdown-content h1), :global(.markdown-content h2), :global(.markdown-content h3) {
        font-family: var(--font-primary-heading);
        color: var(--sage-fresh);
        margin-top: 2em;
        margin-bottom: 0.5em;
        font-weight: 400;
        line-height: 1.1;
    }
    
    /* Hide the first H1 in the markdown content to avoid duplication with the page header */
    :global(.markdown-content > h1:first-child) {
        display: none;
    }
    
    :global(.markdown-content h1) { font-size: 2.5em; }
    :global(.markdown-content h2) { font-size: 2em; border-bottom: 1px solid rgba(135, 168, 120, 0.2); padding-bottom: 0.2em; }
    :global(.markdown-content h3) { font-size: 1.5em; color: var(--sage-dried); }

    :global(.markdown-content p) {
        margin-bottom: 1.5em;
        line-height: 1.8;
        opacity: 0.9;
    }

    :global(.markdown-content ul) {
        list-style-type: none;
        padding-left: 1em;
    }

    :global(.markdown-content li) {
        position: relative;
        padding-left: 1.5em;
        margin-bottom: 0.5em;
    }

    :global(.markdown-content li::before) {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--sage-fresh);
    }

    :global(.markdown-content strong) {
        color: var(--sage-fresh);
        font-weight: 600;
    }

    :global(.markdown-content blockquote) {
        border-left: 4px solid var(--sage-dried);
        padding-left: 1.5em;
        font-style: italic;
        opacity: 0.8;
        margin: 2em 0;
        background: rgba(0,0,0,0.1);
        padding: 1em;
        border-radius: 0 8px 8px 0;
    }
    
    /* Ensure long words break */
    .break-words {
        overflow-wrap: break-word;
        word-break: break-word;
    }
</style>
