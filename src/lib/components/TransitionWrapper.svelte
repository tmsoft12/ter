<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  export let key: any;
</script>

{#key key}
  <div
    in:fly={{ y: 20, duration: 300 }}
    out:fade={{ duration: 200 }}
  >
    <slot />
  </div>
{/key}