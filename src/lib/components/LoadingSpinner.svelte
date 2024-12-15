<script lang="ts">
  export let message = 'Loading...';
</script>

<div class="flex flex-col items-center justify-center space-y-4">
  <div class="w-8 h-8 border-4 border-terminal-purple border-t-terminal-blue rounded-full animate-spin"></div>
  <p class="text-terminal-text">{message}</p>
</div>