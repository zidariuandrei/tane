<script>
let { class: className = '' } = $props();
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 100 100" 
  class={className}
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round"
>
  <!-- Ground -->
  <path d="M20 90 Q50 95 80 90" class="opacity-50" />
  
  <!-- Bamboo Shoot -->
  <path d="M35 90 Q50 20 65 90" /> <!-- Base outline -->
  
  <!-- Sheaths -->
  <path d="M35 80 Q50 70 65 80" />
  <path d="M38 70 Q50 60 62 70" />
  <path d="M40 60 Q50 50 60 60" />
  <path d="M42 50 Q50 40 58 50" />
  <path d="M45 40 Q50 30 55 40" />

  <!-- Tip -->
  <path d="M50 30 L50 20" />
</svg>
