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
  
  <!-- Main Stem (Rachis) -->
  <path d="M50 90 Q55 70 50 30" />
  
  <!-- Curled Tip (Crozier) -->
  <path d="M50 30 Q45 20 50 20 Q55 20 55 25" />
  
  <!-- Lower Leaves (Pinnae) - Unfurling -->
  <path d="M50 70 Q35 65 30 70" />
  <path d="M50 70 Q65 65 70 70" />
  
  <path d="M50 55 Q40 50 35 55" />
  <path d="M50 55 Q60 50 65 55" />
  
  <path d="M50 40 Q45 38 42 40" />
  <path d="M50 40 Q55 38 58 40" />
</svg>
