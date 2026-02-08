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
  
  <!-- Trunk -->
  <path d="M50 90 Q52 70 50 40" />
  
  <!-- Branches -->
  <path d="M50 70 Q30 65 25 55" />
  <path d="M50 60 Q70 55 75 45" />
  
  <!-- Leaves (Lobed) -->
  <path d="M25 55 Q15 50 20 40 Q25 45 30 50 Q28 55 25 55 Z" />
  <path d="M75 45 Q85 40 80 30 Q75 35 70 40 Q72 45 75 45 Z" />
  <path d="M50 40 Q40 30 45 20 Q50 15 55 20 Q60 30 50 40 Z" />
  
  <!-- Small Acorn? -->
  <circle cx="52" cy="68" r="1.5" opacity="0.5" />
</svg>
