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
  <path d="M25 85 Q50 90 75 85" class="opacity-50" />
  <path d="M50 85 L50 30" />
  <path d="M50 70 L30 60" />
  <path d="M50 70 L70 60" />
  <path d="M50 55 L35 45" />
  <path d="M50 55 L65 45" />
  <path d="M50 40 L40 35" />
  <path d="M50 40 L60 35" />
  <path d="M50 30 L50 20" />
  <path d="M30 60 L35 58" opacity="0.5" />
  <path d="M70 60 L65 58" opacity="0.5" />
</svg>