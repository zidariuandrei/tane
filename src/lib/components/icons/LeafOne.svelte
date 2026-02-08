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
  <!-- Simple broad leaf -->
  <path d="M50 90 Q50 70 50 60" /> <!-- Stem base -->
  <path d="M50 60 Q10 40 50 10 Q90 40 50 60 Z" /> <!-- Leaf body -->
  <path d="M50 60 Q50 35 50 10" /> <!-- Midrib -->
  
  <!-- Veins -->
  <path d="M50 50 Q30 45 25 35" />
  <path d="M50 40 Q30 35 30 25" />
  <path d="M50 30 Q35 25 35 20" />
  
  <path d="M50 50 Q70 45 75 35" />
  <path d="M50 40 Q70 35 70 25" />
  <path d="M50 30 Q65 25 65 20" />
</svg>