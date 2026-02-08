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
  
  <!-- Back Stalk (Left) -->
  <path d="M35 90 L35 25" opacity="0.6" stroke-width="2" />
  <path d="M35 60 L35 60" stroke-width="4" stroke-linecap="butt" /> <!-- Node -->
  <path d="M35 40 L35 40" stroke-width="4" stroke-linecap="butt" /> <!-- Node -->

  <!-- Back Stalk (Right) -->
  <path d="M65 90 L65 30" opacity="0.6" stroke-width="2" />
  <path d="M65 65 L65 65" stroke-width="4" stroke-linecap="butt" /> <!-- Node -->
  <path d="M65 45 L65 45" stroke-width="4" stroke-linecap="butt" /> <!-- Node -->

  <!-- Main Stalk (Center) -->
  <path d="M50 90 L50 15" stroke-width="3" />
  <path d="M50 70 L50 70" stroke-width="5" stroke-linecap="butt" /> <!-- Node -->
  <path d="M50 50 L50 50" stroke-width="5" stroke-linecap="butt" /> <!-- Node -->
  <path d="M50 30 L50 30" stroke-width="5" stroke-linecap="butt" /> <!-- Node -->

  <!-- Leaves (Left Cluster) -->
  <path d="M35 40 Q20 35 25 25" />
  <path d="M35 40 Q15 45 20 55" />
  
  <!-- Leaves (Right Cluster) -->
  <path d="M65 45 Q80 40 75 30" />
  <path d="M65 45 Q85 50 80 60" />

  <!-- Leaves (Main Cluster) -->
  <path d="M50 30 Q30 20 35 10" />
  <path d="M50 30 Q70 20 65 10" />
  <path d="M50 50 Q75 40 70 30" />
  <path d="M50 50 Q25 40 30 30" />

</svg>
