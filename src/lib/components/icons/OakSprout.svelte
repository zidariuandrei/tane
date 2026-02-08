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
  
  <!-- Acorn Nut (Split) -->
  <path d="M40 85 Q35 75 45 70" />
  <path d="M60 85 Q65 75 55 70" />
  <path d="M45 70 Q50 75 55 70" opacity="0.5" />
  
  <!-- Root -->
  <path d="M50 85 Q50 95 45 100" opacity="0.5" />
  
  <!-- Shoot -->
  <path d="M50 70 Q55 50 50 40" />
  
  <!-- First Leaves (Lobed) -->
  <path d="M50 40 Q35 30 30 35 Q40 45 50 45" />
  <path d="M50 40 Q65 30 70 35 Q60 45 50 45" />
</svg>
