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
  <!-- Trunk -->
  <path d="M50 90 L50 70" stroke-width="3" />
  <path d="M30 90 Q50 95 70 90" class="opacity-50" />
  
  <!-- Main Branches -->
  <path d="M50 70 Q35 60 30 50" />
  <path d="M50 70 Q65 60 70 50" />
  <path d="M50 70 L50 50" />

  <!-- Canopy / Cloud Shapes -->
  <path d="M20 50 Q10 40 20 30 Q30 20 40 30 Q50 20 60 30 Q70 20 80 30 Q90 40 80 50 Q70 60 60 50 Q50 60 40 50 Q30 60 20 50 Z" />
  
  <!-- Inner Details (Blossoms) -->
  <circle cx="35" cy="40" r="3" opacity="0.6" />
  <circle cx="65" cy="40" r="3" opacity="0.6" />
  <circle cx="50" cy="35" r="3" opacity="0.6" />
  
  <!-- Falling Petals -->
  <path d="M75 65 Q77 67 75 69 Q73 67 75 65" opacity="0.4" />
  <path d="M25 65 Q27 67 25 69 Q23 67 25 65" opacity="0.4" />
</svg>
