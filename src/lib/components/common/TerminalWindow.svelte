<script>
  // Base terminal window component with consistent styling
</script>

<div class="bg-terminal-bg rounded-lg p-8 shadow-2xl w-full max-w-sm mx-auto">
  <WindowChrome />
  <slot />
</div>

<script context="module">
  import WindowChrome from './WindowChrome.svelte';
</script>