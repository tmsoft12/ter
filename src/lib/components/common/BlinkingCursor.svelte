<script lang="ts">
  import { fade } from 'svelte/transition';
  
  export let visible = false;
</script>

{#if visible}
  <div 
    class="absolute bottom-0 left-1/2 h-1 bg-terminal-blue cursor-animation"
    style="width: 2px"
    in:fade
  ></div>
{/if}

<style>
  .cursor-animation {
    animation: blink 1s ease-in-out infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
</style>