<script lang="ts">
  import { scale } from 'svelte/transition';
  import type { PaymentStatus } from '../types/ParkingTypes';
  import TerminalWindow from './common/TerminalWindow.svelte';
  import { getStatusConfig } from '../utils/statusConfig';
  
  export let status: PaymentStatus;
  export let amount: number;
  
  $: statusConfig = getStatusConfig(status);
</script>

<TerminalWindow>
  <div class="text-center" in:scale={{ duration: 300 }}>
    <div class={`text-6xl mb-6 ${statusConfig.color}`}>
      {statusConfig.icon}
    </div>
    
    <h2 class="text-2xl font-bold mb-4 text-terminal-text">
      $ {statusConfig.message}
    </h2>
    
    <p class="text-terminal-green text-xl">
      ${amount.toFixed(2)}
    </p>
    
    {#if status === 'failed'}
      <p class="mt-6 text-red-500">
        > Error: Payment failed. Please try again.
      </p>
    {/if}
  </div>
</TerminalWindow>