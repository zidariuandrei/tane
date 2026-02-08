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
  <path d="M50 90 Q55 70 50 50" />
  
  <!-- Left Branch with Flower -->
  <path d="M50 70 Q40 60 30 65" />
  <circle cx="30" cy="65" r="3" fill="none" stroke-width="2" />
  <path d="M27 62 L33 68" opacity="0.5" />
  <path d="M27 68 L33 62" opacity="0.5" />

  <!-- Right Branch with Leaf -->
  <path d="M50 60 Q65 55 70 65" />
  <path d="M70 65 Q75 60 70 55 Q65 60 70 65" />

  <!-- Top Growth with Bud -->
  <path d="M50 50 Q52 40 48 30" />
  <path d="M48 30 Q45 25 51 25 Q57 25 54 30 Z" stroke-width="2" />
  
  <!-- Falling Petal -->
  <path d="M60 40 Q62 42 60 44 Q58 42 60 40" opacity="0.5" />
</svg>
