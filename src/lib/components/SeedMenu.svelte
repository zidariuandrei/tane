<script lang="ts">
  import { fade } from 'svelte/transition';
  import { enhance } from '$app/forms';
  import { Copy, Download, Scissors, ArrowLeft, RefreshCw } from 'lucide-svelte';

  let { markdown, seedId, topic } = $props<{ 
    markdown: string;
    seedId: string;
    topic: string;
  }>();

  let copied = $state(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(markdown);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tane-report-${topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

<div class="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 mb-8 border-b border-[var(--sage-dried)]/20 font-serif">
  
  <!-- Left: Return -->
  <a href="/" class="flex items-center gap-2 text-[var(--sage-fresh)] hover:text-[var(--sage-dried)] transition-colors group">
    <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
    <span class="text-lg italic">Return to Garden</span>
  </a>

  <!-- Right: Actions -->
  <div class="flex flex-wrap items-center justify-center gap-4">
    
    <!-- Copy -->
    {#if markdown}
    <button 
      onclick={copyToClipboard}
      class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--sage-fresh)]/10 text-[var(--ink-light)] hover:text-[var(--sage-fresh)] transition-all"
      aria-label="Copy to clipboard"
    >
      {#if copied}
        <span class="text-[var(--sage-fresh)] text-sm" in:fade>Copied!</span>
      {:else}
        <Copy class="w-4 h-4 opacity-70" />
        <span class="text-sm uppercase tracking-wider">Copy</span>
      {/if}
    </button>

    <!-- Download -->
    <button 
      onclick={downloadMarkdown}
      class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--sage-fresh)]/10 text-[var(--ink-light)] hover:text-[var(--sage-fresh)] transition-all"
      aria-label="Download Markdown"
    >
      <Download class="w-4 h-4 opacity-70" />
      <span class="text-sm uppercase tracking-wider">Download</span>
    </button>
    {/if}

    <!-- Regenerate -->
    <form method="POST" action="?/regenerate" use:enhance>
        <button 
            type="submit"
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--sage-fresh)]/10 text-[var(--ink-light)] hover:text-[var(--sage-fresh)] transition-all group/regen"
            aria-label="Regenerate Report"
            onclick={(e) => !confirm('Re-grow this seed? The current report will be lost.') && e.preventDefault()}
        >
            <RefreshCw class="w-4 h-4 opacity-70 group-hover/regen:rotate-180 transition-transform duration-500" />
            <span class="text-sm uppercase tracking-wider">Regrow</span>
        </button>
    </form>

    <!-- Prune (Delete) -->
    <form method="POST" action="?/delete" use:enhance>
        <button 
            type="submit"
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-900/20 text-[var(--ink-light)] hover:text-red-400 transition-all group/prune"
            aria-label="Prune Seed"
            onclick={(e) => !confirm('Are you sure you want to prune this seed? This action cannot be undone.') && e.preventDefault()}
        >
            <Scissors class="w-4 h-4 opacity-70 group-hover/prune:text-red-400" />
            <span class="text-sm uppercase tracking-wider group-hover/prune:text-red-400">Prune</span>
        </button>
    </form>

  </div>
</div>
