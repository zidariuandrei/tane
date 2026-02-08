<script>
let { class: className = '' } = $props();
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  class={className}
  fill="currentColor" 
  stroke="none"
>
  <!-- Nut Body -->
  <path d="M12 21C15 21 17 18 17 14L7 14C7 18 9 21 12 21Z" opacity="0.9" />
  
  <!-- Cap (Cupule) -->
  <path d="M7 14L17 14L18 8C18 6 16 4 12 4C8 4 6 6 6 8L7 14Z" opacity="1" fill="var(--color-paper-dark)" />
  
  <!-- Stem -->
  <path d="M12 4L12 2" stroke="var(--color-paper-dark)" stroke-width="2" stroke-linecap="round" />
  
  <!-- Texture on Cap -->
  <path d="M8 8L16 8" stroke="var(--color-paper-cream)" stroke-width="1" opacity="0.5" />
  <path d="M9 11L15 11" stroke="var(--color-paper-cream)" stroke-width="1" opacity="0.5" />
</svg>
