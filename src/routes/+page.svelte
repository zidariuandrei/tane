<script lang="ts">
  import PineSeed from '$lib/components/icons/PineSeed.svelte';
  import PineSprout from '$lib/components/icons/PineSprout.svelte';
  import { enhance } from '$app/forms';

  // We'll replace the hardcoded seeds with a form, but keep the list for now if you want
  // to display recent ones. For this step, I'll focus on the input form.
</script>

<div class="min-h-screen p-8 night-theme flex flex-col items-center justify-center" style="background-color: var(--color-paper-dark); color: var(--color-ink-light);">
  <div class="max-w-2xl w-full">
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
          </div>

          <div class="flex justify-end">
            <button 
              type="submit"
              class="group/btn relative px-6 py-2.5 rounded-full border border-[var(--sage-dried)] bg-[var(--sage-dried)]/5 hover:bg-[var(--sage-fresh)] hover:border-[var(--sage-fresh)] hover:text-[var(--color-paper-dark)] transition-all duration-300 font-serif font-semibold text-lg leading-none text-[var(--sage-fresh)] tracking-wide shadow-sm hover:shadow-md active:scale-95"
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
</div>

<style>
  /* Force dark theme overrides */
  .night-theme {
    --paper-cream: var(--color-paper-dark);
    --paper-warm: var(--color-paper-warm-dark);
    --ink-dark: var(--color-ink-light);
  }
</style>
