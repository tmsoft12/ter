<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TerminalWindow from './common/TerminalWindow.svelte';
  import BlinkingCursor from './common/BlinkingCursor.svelte';
  
  const dispatch = createEventDispatcher<{
    submit: { licensePlate: string };
  }>();
  
  let licensePlate = '';
  let focused = false;
  
  function handleSubmit() {
    if (licensePlate.trim()) {
      dispatch('submit', { licensePlate: licensePlate.toUpperCase() });
      licensePlate = '';
    }
  }
</script>

<TerminalWindow>
  <h2 class="text-terminal-text text-xl font-bold mb-6">
    $ Enter License Plate
  </h2>

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div class="relative">
      <input
        type="text"
        bind:value={licensePlate}
        placeholder="ABC123"
        on:focus={() => focused = true}
        on:blur={() => focused = false}
        class="w-full bg-terminal-bg border-2 border-terminal-purple p-4 rounded-lg
               text-center uppercase text-xl text-terminal-text placeholder-gray-600
               focus:outline-none focus:border-terminal-blue transition-colors"
        maxlength="7"
      />
      <BlinkingCursor visible={focused} />
    </div>

    <button
      type="submit"
      class="w-full bg-terminal-purple text-white py-4 rounded-lg
             hover:bg-opacity-90 transition-all transform hover:scale-[1.02]
             active:scale-[0.98] font-bold text-lg"
    >
      $ Submit
    </button>
  </form>
</TerminalWindow>