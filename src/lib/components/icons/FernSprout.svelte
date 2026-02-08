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
  
  <!-- Fiddlehead Spiral -->
  <!-- Start from ground, curve up and spiral in -->
  <path d="M45 90 Q55 70 55 50" />
  
  <!-- Spiral Head -->
  <path d="M55 50 Q55 35 45 35 Q35 35 35 45 Q35 55 45 55 Q50 55 50 50" />
  
  <!-- Small scales/texture on stem -->
  <path d="M48 80 L52 78" opacity="0.5" />
  <path d="M50 70 L54 68" opacity="0.5" />
  <path d="M52 60 L56 58" opacity="0.5" />
</svg>
