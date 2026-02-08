<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import { fade, fly } from 'svelte/transition';
  import SeedMenu from '$lib/components/SeedMenu.svelte';
  import Branch from '$lib/components/icons/Branch.svelte';
  
  // Plant Icons
  import PineSeed from '$lib/components/icons/PineSeed.svelte';
  import PineSprout from '$lib/components/icons/PineSprout.svelte';
  import PineSapling from '$lib/components/icons/PineSapling.svelte';
  import PineTree from '$lib/components/icons/PineTree.svelte';

  import OakSeed from '$lib/components/icons/OakSeed.svelte';
  import OakSprout from '$lib/components/icons/OakSprout.svelte';
  import OakSapling from '$lib/components/icons/OakSapling.svelte';
  import OakTree from '$lib/components/icons/OakTree.svelte';

  import BambooSeed from '$lib/components/icons/BambooSeed.svelte';
  import BambooSprout from '$lib/components/icons/BambooSprout.svelte';
  import BambooSapling from '$lib/components/icons/BambooSapling.svelte';
  import BambooTree from '$lib/components/icons/BambooTree.svelte';

  import SakuraSeed from '$lib/components/icons/SakuraSeed.svelte';
  import SakuraSprout from '$lib/components/icons/SakuraSprout.svelte';
  import SakuraSapling from '$lib/components/icons/SakuraSapling.svelte';
  import SakuraTree from '$lib/components/icons/SakuraTree.svelte';

  import FernSeed from '$lib/components/icons/FernSeed.svelte';
  import FernSprout from '$lib/components/icons/FernSprout.svelte';
  import FernSapling from '$lib/components/icons/FernSapling.svelte';
  import FernTree from '$lib/components/icons/FernTree.svelte';
  
  let { data } = $props();
  let seed = $derived(data.seed);
  let report = $derived(data.report);

  const plantIcons = {
      pine: { seed: PineSeed, sprout: PineSprout, sapling: PineSapling, tree: PineTree },
      oak: { seed: OakSeed, sprout: OakSprout, sapling: OakSapling, tree: OakTree },
      bamboo: { seed: BambooSeed, sprout: BambooSprout, sapling: BambooSapling, tree: BambooTree },
      sakura: { seed: SakuraSeed, sprout: SakuraSprout, sapling: SakuraSapling, tree: SakuraTree },
      fern: { seed: FernSeed, sprout: FernSprout, sapling: FernSapling, tree: FernTree }
  };

  let icons = $derived(plantIcons[seed.plant_type as keyof typeof plantIcons] || plantIcons.pine);

  // Polling for updates if not completed
  onMount(() => {
    if (seed.status === 'pending' || seed.status === 'processing') {
      const interval = setInterval(() => {
        invalidateAll();
        if (seed.status === 'completed' || seed.status === 'failed') {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  // Render markdown safely
  let renderedReport = $derived(report ? marked(report.content) : '');
</script>

<div class="min-h-screen p-6 md:p-12 night-theme flex flex-col items-center overflow-x-hidden w-full" style="background-color: var(--color-paper-dark); color: var(--color-ink-light);">
    
    <div class="max-w-4xl w-full mt-4 md:mt-8 relative">
        <!-- Top Menu -->
        <SeedMenu markdown={report?.content || ''} seedId={seed.id} topic={seed.content} />

        <!-- Header Info -->
        <header class="mb-12 mt-8 px-4" in:fly={{ y: -10, duration: 600 }}>
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--sage-dried)]/20 pb-6">
                <div class="flex-1">
                    <h1 class="text-4xl md:text-6xl font-handwritten text-[var(--sage-fresh)] mb-4 leading-tight">
                        {seed.content}
                    </h1>
                    <div class="flex items-center gap-3 font-serif text-sm opacity-60">
                         <span class="uppercase tracking-widest px-2 py-0.5 rounded border border-[var(--sage-dried)]/50 text-[var(--sage-fresh)] text-xs">
                            {seed.status}
                         </span>
                         <span>&bull;</span>
                         <span class="italic text-[var(--sepia-light)]">
                            Planted on {new Date(seed.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                         </span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Content -->
        <main class="relative min-h-[500px] px-4">
             <!-- Background SVG -->
             <div class="absolute top-20 right-0 md:-right-20 opacity-10 pointer-events-none z-0 transform rotate-12 fixed-svg-container">
                {#if seed.status === 'completed'}
                    <icons.tree class="w-[300px] h-[300px] md:w-[500px] md:h-[500px]" />
                {:else if seed.status === 'failed'}
                    <Branch class="w-[300px] h-[300px] md:w-[500px] md:h-[500px]" />
                {:else}
                    <icons.sprout class="w-[300px] h-[300px] md:w-[500px] md:h-[500px]" />
                {/if}
             </div>

             {#if seed.status === 'completed'}
                {#if report}
                    <article class="prose prose-invert max-w-none relative z-10" in:fly={{ y: 20, duration: 800, delay: 200 }}>
                         <div class="font-serif leading-relaxed text-[var(--color-ink-light)] markdown-content text-lg">
                            {@html renderedReport}
                         </div>
                    </article>
                {:else}
                    <!-- Completed but missing report (Error State) -->
                    <div class="flex flex-col items-center justify-center py-20 opacity-70 relative z-10">
                        <Branch class="w-24 h-24 text-[var(--sepia-light)] mb-4" />
                        <h3 class="text-2xl font-handwritten text-[var(--sepia-light)]">Report Missing</h3>
                        <p class="font-serif mt-2">The seed has grown, but the journal entry appears to be lost.</p>
                    </div>
                {/if}
             {:else if seed.status === 'failed'}
                <!-- Failed State -->
                <div class="flex flex-col items-center justify-center py-20 opacity-70 relative z-10">
                    <Branch class="w-24 h-24 text-red-900/40 mb-4" />
                    <h3 class="text-2xl font-handwritten text-red-400">Withered</h3>
                    <p class="font-serif mt-2">This seed did not take root.</p>
                </div>
             {:else}
                 <!-- Growing State -->
                 <div class="flex flex-col items-center justify-center py-32 gap-6 relative z-10" in:fade>
                    <div class="relative">
                        {#if seed.status === 'pending'}
                            <icons.seed class="w-20 h-20 text-[var(--sepia-light)] animate-pulse" />
                        {:else}
                            <icons.sprout class="w-24 h-24 text-[var(--sage-fresh)] animate-bounce" />
                        {/if}
                    </div>
                    <div class="text-center">
                        <h3 class="font-handwritten text-3xl text-[var(--sage-fresh)] mb-3">
                            {seed.status === 'pending' ? 'Planted' : 'Germinating...'}
                        </h3>
                         <p class="font-serif opacity-60 text-lg">
                            {seed.status === 'pending' 
                                ? 'Waiting for the season to turn...' 
                                : 'The Gardener is tending to your idea.'}
                         </p>
                    </div>
                 </div>
             {/if}
        </main>
    </div>
</div>

<style>
  /* Markdown Specific Overrides for Herbarium Theme */
  :global(.markdown-content h1), 
  :global(.markdown-content h2), 
  :global(.markdown-content h3) {
    font-family: 'Caveat', cursive;
    color: var(--sage-fresh);
    margin-top: 2em;
    margin-bottom: 0.5em;
  }
  
  :global(.markdown-content h1) { font-size: 2.5em; border-bottom: 1px solid var(--sage-dried); padding-bottom: 0.2em; }
  :global(.markdown-content h2) { font-size: 2em; }
  :global(.markdown-content h3) { font-size: 1.5em; color: var(--sage-dried); }
  
  :global(.markdown-content p) { margin-bottom: 1.5em; line-height: 1.8; }
  
  :global(.markdown-content ul) { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1.5em; marker: var(--sage-fresh); }
  :global(.markdown-content li) { margin-bottom: 0.5em; }
  
  :global(.markdown-content strong) { color: var(--sepia-light); font-weight: 600; }
  :global(.markdown-content a) { color: var(--sage-fresh); text-decoration: underline; text-underline-offset: 4px; }
  :global(.markdown-content blockquote) { 
    border-left: 4px solid var(--sage-dried); 
    padding-left: 1em; 
    font-style: italic; 
    color: var(--sage-dried);
    background: rgba(0,0,0,0.1);
    padding: 1em;
    border-radius: 0 8px 8px 0;
  }

  /* SVG positioning tweak */
  .fixed-svg-container {
      /* Ensure it stays within the relative container but allows overflow if needed */
  }
</style>
