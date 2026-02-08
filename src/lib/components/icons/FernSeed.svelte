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
  <!-- Spore Cluster -->
  <circle cx="8" cy="14" r="3" opacity="0.8" />
  <circle cx="12" cy="11" r="3.5" opacity="0.9" />
  <circle cx="16" cy="14" r="3" opacity="0.8" />
  <circle cx="12" cy="17" r="3" opacity="0.8" />
  
  <!-- Texture -->
  <circle cx="12" cy="11" r="1.5" fill="var(--color-paper-cream)" opacity="0.3" />
</svg>
