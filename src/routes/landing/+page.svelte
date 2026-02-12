<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  // Icons
  import PineSeed from '$lib/components/icons/PineSeed.svelte';
  import PineSprout from '$lib/components/icons/PineSprout.svelte';
  import PineTree from '$lib/components/icons/PineTree.svelte';
  import Branch from '$lib/components/icons/Branch.svelte';
  
  // State
  let mounted = $state(false);
  let scrollY = $state(0);
  let innerHeight = $state(0);

  onMount(() => {
    mounted = true;
    const updateScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  });
  
  // Parallax helper
  function parallax(speed: number) {
    return `transform: translateY(${scrollY * speed}px)`;
  }
</script>

<svelte:window bind:innerHeight />

<div class="min-h-screen bg-[var(--color-paper-dark)] text-[var(--color-ink-light)] font-serif overflow-x-hidden selection:bg-[var(--sage-dried)] selection:text-[var(--color-paper-dark)]">
  
  <!-- Global Texture: Digital Noise / Grain -->
  <div class="fixed inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-50 bg-repeat" 
       style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E');">
  </div>

  <!-- Ambient Glows -->
  <div class="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--sage-fresh)] opacity-[0.04] blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
  <div class="fixed bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--sage-dried)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>


  {#if mounted}
    <main class="relative z-10 w-full">
      
      <!-- HERO: The Origin -->
      <section class="min-h-screen relative flex items-center justify-center px-6 md:px-12 overflow-hidden">
        
        <!-- Background Elements -->
        <div class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]" style={parallax(0.2)}>
             <PineTree class="w-[120vh] h-[120vh] text-[var(--sage-fresh)] rotate-12" />
        </div>

        <div class="max-w-4xl w-full relative z-10 flex flex-col md:items-start text-left gap-8 mt-[-10vh]">
            
            <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--sage-dried)]/20 bg-[var(--sage-dried)]/5 backdrop-blur-sm"
                 in:fly={{ y: 20, duration: 800, delay: 0 }}>
                <span class="w-2 h-2 rounded-full bg-[var(--sage-fresh)] animate-pulse"></span>
                <span class="font-mono text-xs uppercase tracking-widest text-[var(--sage-fresh)]">System Online</span>
            </div>

            <h1 class="font-heading text-7xl md:text-9xl text-[var(--color-ink-light)] leading-[0.9] tracking-tighter"
                in:fly={{ y: 30, duration: 1000, delay: 200, easing: cubicOut }}>
                Ideas wither<br/>
                <span class="text-[var(--sage-dried)] italic font-serif opacity-60">in the dark.</span>
            </h1>

            <p class="font-serif text-xl md:text-2xl text-[var(--color-ink-light)]/80 max-w-xl leading-relaxed border-l-2 border-[var(--sage-fresh)] pl-6 ml-1"
               in:fly={{ y: 30, duration: 1000, delay: 400, easing: cubicOut }}>
                Tane is an AI research gardener. Plant a raw concept, and watch it grow into a fully researched strategy report.
            </p>

            <div class="flex flex-col md:flex-row gap-6 mt-8" in:fly={{ y: 30, duration: 1000, delay: 600 }}>
                <a href="https://github.com/zidariuandrei/tane" target="_blank" rel="noopener noreferrer"
                   class="group relative px-8 py-4 bg-[var(--sage-fresh)] text-[var(--color-paper-dark)] font-heading text-2xl rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(167,192,128,0.4)]">
                    <span class="relative z-10 flex items-center gap-3">
                        View Source
                        <PineSeed class="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    </span>
                    <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
                
                <button class="px-8 py-4 text-[var(--sage-fresh)] font-serif italic text-lg hover:text-[var(--color-ink-light)] transition-colors flex items-center gap-2 group/link" onclick={() => window.scrollTo({ top: innerHeight, behavior: 'smooth' })}>
                    <span>How it works</span>
                    <span class="group-hover/link:translate-y-1 transition-transform">↓</span>
                </button>
            </div>
        </div>
      </section>

      <!-- SECTION 2: The Process (Modern Grid) -->
      <section class="py-32 px-6 md:px-12 relative">
         <div class="max-w-6xl mx-auto">
            
            <div class="mb-24 md:w-1/2">
                <h2 class="font-heading text-5xl md:text-6xl text-[var(--sage-fresh)] mb-6">Autonomous Growth</h2>
                <p class="font-serif text-xl opacity-70 leading-relaxed">
                    Unlike traditional chat bots that just talk back, Tane is an agent. It plans, searches, reads, and synthesizes. It does the heavy lifting while you sleep.
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
                <!-- CARD 1 -->
                <div class="group relative p-8 rounded-2xl bg-[var(--color-paper-warm-dark)] border border-[var(--sage-dried)]/10 hover:border-[var(--sage-fresh)]/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 scale-150 origin-top-right">
                        <PineSeed class="w-32 h-32 text-[var(--sage-fresh)]" />
                    </div>
                    <div class="relative z-10 h-full flex flex-col">
                        <span class="font-mono text-xs text-[var(--sage-fresh)] mb-4">PHASE 01</span>
                        <h3 class="font-heading text-3xl mb-4 text-[var(--color-ink-light)]">The Seed</h3>
                        <p class="font-serif opacity-70 mb-8 flex-grow">
                            Input a raw, messy idea. "Uber for dog walking" or "A cafe that only serves toast." No business plan required.
                        </p>
                        <div class="h-px w-full bg-[var(--sage-dried)]/20 mt-auto"></div>
                    </div>
                </div>

                <!-- CARD 2 -->
                <div class="group relative p-8 rounded-2xl bg-[var(--color-paper-warm-dark)] border border-[var(--sage-dried)]/10 hover:border-[var(--sage-fresh)]/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 scale-150 origin-top-right">
                        <PineSprout class="w-32 h-32 text-[var(--sage-fresh)]" />
                    </div>
                    <div class="relative z-10 h-full flex flex-col">
                        <span class="font-mono text-xs text-[var(--sage-fresh)] mb-4">PHASE 02</span>
                        <h3 class="font-heading text-3xl mb-4 text-[var(--color-ink-light)]">The Research</h3>
                        <p class="font-serif opacity-70 mb-8 flex-grow">
                            Our agent scans the web for competitors, estimates market size (TAM/SAM/SOM), and identifies critical risks.
                        </p>
                        <div class="h-px w-full bg-[var(--sage-dried)]/20 mt-auto"></div>
                    </div>
                </div>

                <!-- CARD 3 -->
                <div class="group relative p-8 rounded-2xl bg-[var(--color-paper-warm-dark)] border border-[var(--sage-dried)]/10 hover:border-[var(--sage-fresh)]/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 scale-150 origin-top-right">
                        <PineTree class="w-32 h-32 text-[var(--sage-fresh)]" />
                    </div>
                    <div class="relative z-10 h-full flex flex-col">
                        <span class="font-mono text-xs text-[var(--sage-fresh)] mb-4">PHASE 03</span>
                        <h3 class="font-heading text-3xl mb-4 text-[var(--color-ink-light)]">The Report</h3>
                        <p class="font-serif opacity-70 mb-8 flex-grow">
                            Receive a structured markdown dossier. Strategic advice, SWOT analysis, and a clear path forward.
                        </p>
                        <div class="h-px w-full bg-[var(--sage-dried)]/20 mt-auto"></div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      <!-- SECTION 3: The Manifesto (Typography Focus) -->
      <section class="py-32 bg-[var(--color-paper-warm-dark)]/30 border-y border-[var(--sage-dried)]/10 relative overflow-hidden">
         <!-- Parallax Background Text -->
         <div class="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden opacity-[0.03] pointer-events-none select-none">
            <div class="whitespace-nowrap font-heading text-[20vw] leading-none text-[var(--sage-fresh)]" style="transform: translateX({-scrollY * 0.2}px)">
                GROW RESEARCH VALIDATE GROW RESEARCH VALIDATE
            </div>
         </div>

         <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <Branch class="w-16 h-16 mx-auto mb-8 text-[var(--sage-dried)] opacity-60" />
            
            <h2 class="font-heading text-5xl md:text-7xl mb-12 text-[var(--color-ink-light)]">
                "Speed is irrelevant if you are going in the wrong direction."
            </h2>
            
            <div class="grid md:grid-cols-2 gap-12 text-left font-serif text-lg opacity-80 leading-relaxed max-w-3xl mx-auto">
                <p>
                    <strong class="text-[var(--sage-fresh)] block mb-2 font-sans text-sm uppercase tracking-widest">The Problem</strong>
                    In the rush to build, we often skip the soil testing. We launch products nobody wants, solving problems nobody has. We code for weeks before we research for an hour.
                </p>
                <p>
                    <strong class="text-[var(--sage-fresh)] block mb-2 font-sans text-sm uppercase tracking-widest">The Tane Way</strong>
                    Tane introduces "Slow Software" principles to the AI age. By using autonomous agents to perform deep, deliberate research, we ensure your next venture has strong roots before it ever breaks ground.
                </p>
            </div>
         </div>
      </section>

      <!-- SECTION 4: Footer / CTA -->
      <section class="py-32 px-6 text-center relative">
          <div class="max-w-2xl mx-auto">
              <h2 class="font-heading text-6xl text-[var(--sage-fresh)] mb-8">Start your garden.</h2>
              <p class="font-serif text-xl opacity-60 mb-12">
                  The soil is ready. The season is right.
              </p>
              
              <a href="https://github.com/zidariuandrei/tane" target="_blank" rel="noopener noreferrer"
                 class="inline-block px-12 py-5 rounded-full border border-[var(--sage-fresh)] text-[var(--sage-fresh)] font-heading text-3xl hover:bg-[var(--sage-fresh)] hover:text-[var(--color-paper-dark)] transition-all duration-300 hover:scale-105">
                 View Source on GitHub
              </a>

              <div class="mt-24 pt-12 border-t border-[var(--sage-dried)]/10 flex flex-col md:flex-row justify-between items-center opacity-40 font-serif text-sm">
                  <p>&copy; {new Date().getFullYear()} Tane Project</p>
                  <div class="flex gap-6 mt-4 md:mt-0">
                      <span>Designed in Timișoara</span>
                      <span>•</span>
                      <span>Built with Svelte & Pi</span>
                  </div>
              </div>
          </div>
      </section>

    </main>
  {/if}
</div>

<style>
  :global(body) {
    background-color: var(--color-paper-dark);
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.04; transform: scale(1); }
    50% { opacity: 0.08; transform: scale(1.1); }
  }
  .animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
  }
</style>
