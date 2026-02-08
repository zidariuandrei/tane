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
  
  <!-- Main Stem - slightly curved -->
  <path d="M50 90 Q55 70 50 50" />
  
  <!-- Left Leaf (Serrated/Pointy) -->
  <path d="M50 70 Q35 60 30 70 Q40 80 50 70" />
  
  <!-- Right Leaf (Serrated/Pointy) -->
  <path d="M50 60 Q65 50 70 60 Q60 70 50 60" />

  <!-- Top Shoot -->
  <path d="M50 50 L50 35" />
  <circle cx="50" cy="35" r="2" fill="none" stroke-width="2" />
</svg>
