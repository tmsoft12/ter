<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { PaymentStatus } from '../types/ParkingTypes';
  import TerminalWindow from './common/TerminalWindow.svelte';
  
  export let amount: number;
  
  const dispatch = createEventDispatcher<{
    payment: { status: PaymentStatus };
  }>();
  
  let scanning = false;
  
  async function simulateRFIDScan() {
    scanning = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    const success = Math.random() > 0.2;
    dispatch('payment', { status: success ? 'success' : 'failed' });
    scanning = false;
  }
</script>

<TerminalWindow>
  <h2 class="text-terminal-text text-xl font-bold mb-6">$ Payment Required</h2>
  
  <div class="text-4xl font-bold text-terminal-green mb-8">
    ${amount.toFixed(2)}
  </div>
  
  {#if scanning}
    <div class="space-y-4">
      <div class="h-2 bg-terminal-purple rounded-full overflow-hidden">
        <div class="h-full bg-terminal-blue animate-scan"></div>
      </div>
      <p class="text-terminal-text text-center">Scanning RFID Card...</p>
    </div>
  {:else}
    <button
      on:click={simulateRFIDScan}
      class="w-full bg-terminal-green text-terminal-bg py-4 rounded-lg
             hover:bg-opacity-90 transition-all transform hover:scale-[1.02]
             active:scale-[0.98] font-bold text-lg"
      disabled={scanning}
    >
      $ Scan RFID Card
    </button>
  {/if}
  
  <p class="mt-6 text-sm text-terminal-text text-center opacity-80">
    > Place your RFID card on the scanner
  </p>
</TerminalWindow>