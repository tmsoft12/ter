<script lang="ts">
  import { onMount } from 'svelte';
  import LicensePlateInput from './lib/components/LicensePlateInput.svelte';
  import RFIDScanner from './lib/components/RFIDScanner.svelte';
  import PaymentStatus from './lib/components/PaymentStatus.svelte';
  import LoadingSpinner from './lib/components/LoadingSpinner.svelte';
  import ErrorMessage from './lib/components/ErrorMessage.svelte';
  import TransitionWrapper from './lib/components/TransitionWrapper.svelte';
  import { parkingStore, loading, error } from './lib/stores/parkingStore';
  import type { PaymentStatus as PaymentStatusType } from './lib/types/ParkingTypes';
  
  let step: 'input' | 'payment' | 'status' = 'input';
  let amount = 0;
  let paymentStatus: PaymentStatusType = 'pending';
  
  async function handleLicensePlateSubmit(event: CustomEvent<{ licensePlate: string }>) {
    const calculatedAmount = await parkingStore.calculateFee(event.detail.licensePlate);
    if (calculatedAmount !== null) {
      amount = calculatedAmount;
      step = 'payment';
    }
  }
  
  async function handlePayment() {
    paymentStatus = await parkingStore.processPayment(amount);
    step = 'status';
    
    if (paymentStatus === 'success') {
      setTimeout(() => {
        step = 'input';
        amount = 0;
        paymentStatus = 'pending';
        parkingStore.reset();
      }, 3000);
    }
  }
</script>

<main class="min-h-screen bg-terminal-bg p-4 flex flex-col items-center justify-center">
  <h1 class="text-4xl font-bold text-terminal-purple mb-12 tracking-tight">
    Terminal Pay
  </h1>
  
  {#if $error}
    <ErrorMessage message={$error} />
  {/if}
  
  <TransitionWrapper key={step}>
    {#if $loading}
      <LoadingSpinner />
    {:else if step === 'input'}
      <LicensePlateInput on:submit={handleLicensePlateSubmit} />
    {:else if step === 'payment'}
      <RFIDScanner {amount} on:payment={handlePayment} />
    {:else}
      <PaymentStatus status={paymentStatus} {amount} />
    {/if}
  </TransitionWrapper>
</main>

<style>
  :global(body) {
    background-color: theme(colors.terminal.bg);
  }
</style>