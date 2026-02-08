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
  <!-- Rhizome Shape -->
  <path d="M4 12C4 10 6 8 8 9C10 7 14 7 16 9C19 8 21 10 20 13C21 16 18 18 15 17C12 19 8 18 6 16C3 16 2 14 4 12Z" opacity="0.9" />
  
  <!-- Root Hairs -->
  <path d="M6 16 L4 19" stroke="var(--color-paper-dark)" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4" />
  <path d="M10 17 L9 20" stroke="var(--color-paper-dark)" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4" />
  <path d="M15 17 L16 20" stroke="var(--color-paper-dark)" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4" />
  <path d="M19 13 L22 14" stroke="var(--color-paper-dark)" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4" />
</svg>
