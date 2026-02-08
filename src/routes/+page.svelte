<script lang="ts">
import { fade } from 'svelte/transition';
import { enhance } from '$app/forms';
import { invalidateAll } from '$app/navigation';
import { onMount } from 'svelte';
import SeedIcon from '$lib/components/SeedIcon.svelte';
import PineSeed from '$lib/components/icons/PineSeed.svelte'; 

let { data, form } = $props();

let activeFilter = $state('all');
let seeds = $derived(data.seeds);

let filteredSeeds = $derived(
    activeFilter === 'all'
        ? seeds
        : seeds.filter((s) => {
            if (activeFilter === 'planted') return s.status === 'pending';
            if (activeFilter === 'sprouting') return s.status === 'processing';
            if (activeFilter === 'harvested') return s.status === 'completed';
            if (activeFilter === 'withered') return s.status === 'failed';
            return true;
        })
);

onMount(() => {
    const interval = setInterval(() => {
        invalidateAll();
    }, 3000);
    return () => clearInterval(interval);
});
</script>

<div class="min-h-screen p-8 night-theme flex flex-col items-center" style="background-color: var(--color-paper-dark); color: var(--color-ink-light);">
  <div class="max-w-2xl w-full mt-12 md:mt-24">
    <header class="mb-16 text-center">
      <h1 class="text-5xl font-semibold font-serif text-[var(--sage-fresh)] mb-2 tracking-tight flex items-center justify-center gap-3">
        <span class="font-normal text-3xl opacity-40 mt-1">種</span>
        tane.
      </h1>
      <p class="text-lg opacity-80 font-serif italic tracking-wide">
        "From a single seed, a forest grows."
      </p>
    </header>

    <form method="POST" action="?/plant" use:enhance class="relative group max-w-xl mx-auto mt-12">
      <div class="relative bg-[var(--color-paper-warm-dark)] rounded-xl p-8 shadow-2xl transition-transform duration-500 hover:scale-[1.005]">
        <!-- Paper Texture Overlay for Card -->
        <div class="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
             style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E');">
        </div>

        <div class="flex flex-col gap-8 relative z-10">
          <label for="idea" class="sr-only">Your Idea</label>
          
          <div class="relative">
            <textarea
              id="idea"
              name="idea"
              rows="3"
              placeholder="Plant an idea..."
              class="w-full bg-transparent border-b border-[var(--sage-dried)] focus:border-[var(--sage-fresh)] outline-none text-2xl font-serif text-[var(--color-ink-light)] placeholder:text-[var(--color-ink-light)] placeholder:opacity-30 resize-none py-2 transition-colors leading-relaxed"
              required
            ></textarea>
            <div class="absolute right-0 bottom-4 pointer-events-none opacity-40">
              <PineSeed class="w-6 h-6 text-[var(--sage-fresh)]" />
            </div>
            {#if form?.missing}
              <p class="absolute -bottom-6 left-0 text-red-400 text-sm font-serif italic">
                The seed cannot be empty.
              </p>
            {/if}
            {#if form?.error}
              <p class="absolute -bottom-6 left-0 text-red-400 text-sm font-serif italic">
                {form.error}
              </p>
            {/if}
          </div>

          <div class="flex justify-end">
            <button 
              type="submit"
              class="group/btn relative px-6 py-2.5 rounded-full border border-[var(--sage-dried)] bg-[var(--sage-dried)]/5 hover:bg-[var(--sage-fresh)] hover:border-[var(--sage-fresh)] hover:text-[var(--color-paper-dark)] transition-all duration-300 font-serif font-semibold text-lg leading-none text-[var(--sage-fresh)] tracking-wide shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <span class="relative z-10 flex items-center gap-2">
                <span class="mt-0.5">Plant Seed</span>
                <span class="group-hover/btn:rotate-12 transition-transform duration-300">
                  <PineSeed class="w-5 h-5" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- THE GARDEN -->
  {#if data.seeds.length > 0}
    <section class="w-full max-w-6xl mt-32 px-4 pb-24">
        <!-- Section Header -->
        <div class="flex flex-col items-center justify-center gap-6 mb-12 opacity-90">
            <h2 class="text-2xl font-serif italic opacity-40">The Nursery</h2>
            
            <!-- Filter Tabs -->
            <div class="flex justify-center gap-2 flex-wrap">
                {#each ['all', 'planted', 'sprouting', 'harvested', 'withered'] as filter}
                    <button 
                        onclick={() => activeFilter = filter}
                        class="px-4 py-1 rounded-full border text-xs font-serif uppercase tracking-widest transition-all duration-300 cursor-pointer {activeFilter === filter ? 'bg-[var(--sage-fresh)] text-[var(--color-paper-dark)] border-[var(--sage-fresh)] font-bold' : 'border-[var(--sage-dried)]/30 text-[var(--sage-dried)] hover:border-[var(--sage-fresh)] hover:text-[var(--sage-fresh)] bg-transparent'}"
                    >
                        {filter}
                    </button>
                {/each}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredSeeds as seed (seed.id)}
                {@const isPlanted = seed.status === 'pending'}
                {@const isGrowing = seed.status === 'processing'}
                {@const isCompleted = seed.status === 'completed'}
                {@const isFailed = seed.status === 'failed'}
                
                {@const accentColor = isPlanted ? 'var(--color-planted)' : isFailed ? '#ef4444' : 'var(--color-sprouting)'}
                <!-- Update Status Labels to match Filters -->
                {@const statusLabel = isPlanted ? 'PLANTED' : isGrowing ? 'SPROUTING' : isCompleted ? 'HARVESTED' : 'WITHERED'}

                <!-- Make the whole card clickable -->
                <a href={isCompleted ? `/report/${seed.id}` : `/seed/${seed.id}`} 
                   class="relative bg-[var(--color-paper-warm-dark)] rounded-2xl p-8 shadow-lg overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl block h-full min-h-[220px] flex flex-col cursor-pointer"
                   in:fade={{ duration: 400 }}>
                    
                    <!-- Background Illustration (Faint) -->
                    <div class="absolute -bottom-8 -right-8 opacity-10 transform rotate-12 scale-150 transition-transform duration-500 group-hover:scale-175 group-hover:opacity-20 pointer-events-none text-[var(--sage-fresh)]">
                         <SeedIcon type={seed.plant_type} status={seed.status} class="w-48 h-48" />
                    </div>

                    <div class="relative z-10 flex flex-col h-full pointer-events-none"> <!-- content pointer-events-none so click passes to container -->
                        <div class="flex flex-col mb-4">
                            <!-- Left Accent Bar -->
                            <div class="absolute left-0 top-8 bottom-8 w-1 rounded-r-full transition-all duration-300 group-hover:w-1.5" style="background-color: {accentColor}"></div>
                            
                            <!-- Title (The Idea) -->
                            <h3 class="font-heading text-3xl pl-6 text-[var(--color-ink-light)] transition-colors duration-300 group-hover:text-[var(--sage-fresh)] leading-tight mb-4">
                                {seed.content.length > 50 ? seed.content.slice(0, 50) + '...' : seed.content}
                            </h3>

                            <!-- Date (moved below title) -->
                            <span class="font-serif text-xs opacity-40 whitespace-nowrap pl-6 block mb-4">
                                {new Date(seed.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>

                        <!-- Status Description removed to reduce bloat -->
                        <div class="flex-grow"></div>
                        
                        <!-- Footer: Status Pill & Icon -->
                        <div class="flex justify-between items-center pl-6 mt-auto">
                            <!-- Status Pill -->
                            <span class="px-3 py-1 rounded-full border border-opacity-30 text-[10px] tracking-[0.2em] font-serif uppercase flex items-center gap-2 transition-colors duration-300"
                                  style="border-color: {accentColor}; color: {accentColor}">
                                {#if isGrowing}
                                  <span class="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-sprouting)] animate-pulse"></span>
                                {/if}
                                {statusLabel}
                            </span>

                            <!-- Hover Icon (Only if completed) -->
                            {#if isCompleted}
                              <div class="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 text-[var(--sage-fresh)] flex items-center gap-1 text-xs font-serif italic">
                                <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">Read Journal</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                  <circle cx="12" cy="12" r="3"/>
                                </svg>
                              </div>
                            {/if}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </section>
  {/if}
</div>

<style>
  /* Force dark theme overrides */
  .night-theme {
    --paper-cream: var(--color-paper-dark);
    --paper-warm: var(--color-paper-warm-dark);
    --ink-dark: var(--color-ink-light);
  }
</style>
