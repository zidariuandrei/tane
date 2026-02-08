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
  
  <!-- Stalk -->
  <path d="M48 90 L48 20" stroke-width="2" />
  <path d="M52 90 L52 20" stroke-width="2" />
  
  <!-- Segments -->
  <path d="M48 70 L52 70" />
  <path d="M48 50 L52 50" />
  <path d="M48 30 L52 30" />
  
  <!-- Leaves (Left) -->
  <path d="M48 70 Q30 65 35 55 Q40 60 48 70" />
  <path d="M48 50 Q25 45 30 35 Q35 40 48 50" />

  <!-- Leaves (Right) -->
  <path d="M52 50 Q75 45 70 35 Q65 40 52 50" />
  <path d="M52 30 Q70 25 65 15 Q60 20 52 30" />
</svg>
