<script>
  let { class: className = "" } = $props();
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
  <path d="M50 90 L50 70" stroke-width="3" />
  <path d="M30 90 Q50 95 70 90" class="opacity-50" />
  <path d="M50 70 L25 75 L30 60 L50 50 L70 60 L75 75 L50 70" />
  <path d="M50 50 L30 55 L35 40 L50 30 L65 40 L70 55 L50 50" />
  <path d="M50 30 L35 35 L40 25 L50 10 L60 25 L65 35 L50 30" />
  <path d="M50 65 L35 68" opacity="0.3" />
  <path d="M50 65 L65 68" opacity="0.3" />
  <path d="M50 45 L40 48" opacity="0.3" />
  <path d="M50 45 L60 48" opacity="0.3" />
</svg>