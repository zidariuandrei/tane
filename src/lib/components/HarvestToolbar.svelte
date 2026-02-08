<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Copy, Download, Archive } from 'lucide-svelte';

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

<div class="flex flex-wrap items-center justify-center gap-1 p-2 bg-[var(--paper-warm-dark)] shadow-[2px_2px_10px_rgba(0,0,0,0.2)] rounded-lg border border-[var(--sepia-dark)]/30 rotate-1 transition-transform hover:rotate-0 duration-300" transition:fade>
  
  <!-- "Tools" Label (Tape look) -->
  <div class="absolute -top-3 left-4 bg-[var(--sepia-light)]/80 text-[var(--color-paper-dark)] text-xs font-serif px-2 py-0.5 shadow-sm transform -rotate-2">
    Specimen Tools
  </div>
  <button 
    onclick={copyToClipboard}
    class="relative group flex items-center gap-2 px-4 py-2 transition-all duration-300 font-handwritten text-xl text-[var(--ink-light)] hover:text-[var(--sage-fresh)]"
    aria-label="Copy to clipboard"
  >
    <!-- Hand-drawn circle background on hover -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
       <svg viewBox="0 0 100 60" class="w-full h-full stroke-[var(--sage-dried)] stroke-1 fill-none" preserveAspectRatio="none">
         <path d="M5,30 Q20,5 50,5 T95,30 T50,55 T5,30" stroke-dasharray="4 2" />
       </svg>
    </div>

    {#if copied}
      <span class="text-[var(--sage-fresh)]" in:fade>Copied!</span>
    {:else}
      <Copy class="w-5 h-5 opacity-70 group-hover:opacity-100" />
      <span>Copy</span>
    {/if}
  </button>

  <div class="w-px h-6 bg-[var(--sage-dried)] opacity-30 rotate-12 mx-1"></div>

  <!-- Download Button -->
  <button 
    onclick={downloadMarkdown}
    class="relative group flex items-center gap-2 px-4 py-2 transition-all duration-300 font-handwritten text-xl text-[var(--ink-light)] hover:text-[var(--sage-fresh)]"
    aria-label="Download Markdown"
  >
    <!-- Hand-drawn circle background on hover -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
       <svg viewBox="0 0 100 60" class="w-full h-full stroke-[var(--sage-dried)] stroke-1 fill-none" preserveAspectRatio="none">
         <path d="M5,30 Q20,55 50,55 T95,30 T50,5 T5,30" stroke-dasharray="4 2" />
       </svg>
    </div>

    <Download class="w-5 h-5 opacity-70 group-hover:opacity-100" />
    <span>Download</span>
  </button>

</div>
