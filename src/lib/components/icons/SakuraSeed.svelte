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
  <!-- Simple Cherry Pit Shape -->
  <path d="M12 4C8 4 5 8 5 13C5 17 8 20 12 20C16 20 19 17 19 13C19 8 16 4 12 4Z" opacity="0.9" />
  <!-- Ridge/Texture line -->
  <path d="M12 6C12 6 10 10 10 13C10 16 11 18 12 18" stroke="var(--color-paper-dark)" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.3" />
</svg>
