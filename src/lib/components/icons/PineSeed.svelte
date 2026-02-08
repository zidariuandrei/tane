<script>
let { class: className = '' } = $props();
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  class={className}
  fill="currentColor" 
  stroke="none"
>
  <!-- 
    Shifted up by 1 unit to optically align with text that has no descenders 
    (visual center of "Plant Seed" is higher than the line-height center)
  -->
  <path d="M12 2C12 2 6 9 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 9 12 2 12 2Z" opacity="0.9" />
  
  <path d="M12 4.5C12 4.5 8 10 8 15C8 17 9.5 19 12 19" stroke="var(--color-paper-dark)" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.3" />
</svg>
