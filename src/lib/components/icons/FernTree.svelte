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
  <path d="M50 90 L50 15" stroke-width="2" />
  
  <!-- Left Fronds -->
  <path d="M50 80 Q20 70 10 75" />
  <path d="M50 65 Q25 55 15 60" />
  <path d="M50 50 Q30 40 20 45" />
  <path d="M50 35 Q35 25 25 30" />
  <path d="M50 20 Q40 15 35 18" />

  <!-- Right Fronds -->
  <path d="M50 80 Q80 70 90 75" />
  <path d="M50 65 Q75 55 85 60" />
  <path d="M50 50 Q70 40 80 45" />
  <path d="M50 35 Q65 25 75 30" />
  <path d="M50 20 Q60 15 65 18" />

  <!-- Inner texture/veins (optional for detail) -->
  <path d="M15 73 L20 72" opacity="0.4" />
  <path d="M85 73 L80 72" opacity="0.4" />
</svg>
