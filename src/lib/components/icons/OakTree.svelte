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
  <path d="M10 90 Q50 95 90 90" class="opacity-50" />
  
  <!-- Thick Trunk -->
  <path d="M40 90 Q45 70 45 60" stroke-width="3" />
  <path d="M60 90 Q55 70 55 60" stroke-width="3" />
  <path d="M45 60 L45 50" />
  <path d="M55 60 L55 50" />
  
  <!-- Main Branches -->
  <path d="M50 50 Q30 40 20 50" />
  <path d="M50 50 Q70 40 80 50" />
  <path d="M50 50 L50 30" />
  
  <!-- Canopy (Large, lobed cloud) -->
  <path d="M15 60 Q5 50 10 40 Q5 30 20 20 Q35 10 50 15 Q65 10 80 20 Q95 30 90 40 Q95 50 85 60 Q75 70 50 65 Q25 70 15 60 Z" />
  
  <!-- Inner Detail (Leaves) -->
  <path d="M30 40 Q35 35 40 40" opacity="0.4" />
  <path d="M60 40 Q65 35 70 40" opacity="0.4" />
  <path d="M50 30 Q55 25 60 30" opacity="0.4" />
  
  <!-- Acorn Hanging -->
  <line x1="65" y1="62" x2="65" y2="66" stroke-width="1" opacity="0.5" />
  <circle cx="65" cy="67" r="1.5" opacity="0.5" />
</svg>
