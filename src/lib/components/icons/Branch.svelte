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
  <!-- Main branch -->
  <path d="M50 90 C50 70 60 60 70 30" />
  
  <!-- Side branches -->
  <path d="M55 75 Q30 70 20 60" />
  <path d="M60 60 Q40 50 35 40" />
  <path d="M65 45 Q50 35 45 25" />
  
  <!-- Tiny leaves on ends -->
  <path d="M20 60 Q15 55 20 50 Q25 55 20 60" fill="currentColor" fill-opacity="0.1" />
  <path d="M35 40 Q30 35 35 30 Q40 35 35 40" fill="currentColor" fill-opacity="0.1" />
  <path d="M45 25 Q40 20 45 15 Q50 20 45 25" fill="currentColor" fill-opacity="0.1" />
  <path d="M70 30 Q65 25 70 20 Q75 25 70 30" fill="currentColor" fill-opacity="0.1" />
</svg>