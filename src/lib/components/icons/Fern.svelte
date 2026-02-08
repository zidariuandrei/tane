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
  <!-- Main stem -->
  <path d="M50 90 Q50 50 50 10" />
  
  <!-- Left leaves -->
  <path d="M50 80 Q30 75 20 85" />
  <path d="M50 70 Q25 60 15 65" />
  <path d="M50 60 Q20 45 15 50" />
  <path d="M50 50 Q20 35 15 35" />
  <path d="M50 40 Q25 25 20 20" />
  <path d="M50 30 Q35 20 30 15" />
  
  <!-- Right leaves -->
  <path d="M50 80 Q70 75 80 85" />
  <path d="M50 70 Q75 60 85 65" />
  <path d="M50 60 Q80 45 85 50" />
  <path d="M50 50 Q80 35 85 35" />
  <path d="M50 40 Q75 25 80 20" />
  <path d="M50 30 Q65 20 70 15" />
</svg>