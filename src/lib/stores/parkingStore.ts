import { writable, derived } from 'svelte/store';
import type { ParkingSession, PaymentStatus } from '../types/ParkingTypes';
import { parkingAPI } from '../api/parkingAPI';

interface ParkingState {
  sessions: ParkingSession[];
  currentSession: ParkingSession | null;
  loading: boolean;
  error: string | null;
}

const createParkingStore = () => {
  const initialState: ParkingState = {
    sessions: [],
    currentSession: null,
    loading: false,
    error: null
  };

  const { subscribe, set, update } = writable<ParkingState>(initialState);

  return {
    subscribe,
    
    async calculateFee(licensePlate: string) {
      update(state => ({ ...state, loading: true, error: null }));
      
      const entryTime = new Date(Date.now() - 2 * 60 * 60 * 1000);
      const exitTime = new Date();
      
      const response = await parkingAPI.calculateParkingFee({
        licensePlate,
        entryTime: entryTime.toISOString(),
        exitTime: exitTime.toISOString()
      });
      
      if (response.success && response.data) {
        update(state => ({
          ...state,
          loading: false,
          currentSession: {
            licensePlate,
            entryTime,
            exitTime,
            amount: response.data.amount,
            paid: false
          }
        }));
        return response.data.amount;
      } else {
        update(state => ({
          ...state,
          loading: false,
          error: response.error?.message || 'Failed to calculate parking fee'
        }));
        return null;
      }
    },
    
    async processPayment(amount: number): Promise<PaymentStatus> {
      update(state => ({ ...state, loading: true, error: null }));
      
      const response = await parkingAPI.processPayment({
        sessionId: 'temp-session-id',
        rfidCardId: 'simulated-rfid-card',
        amount
      });
      
      update(state => ({ ...state, loading: false }));
      
      if (response.success && response.data) {
        if (response.data.status === 'success') {
          update(state => ({
            ...state,
            sessions: [...state.sessions, state.currentSession!],
            currentSession: null
          }));
          return 'success';
        }
      }
      
      update(state => ({
        ...state,
        error: response.error?.message || 'Payment processing failed'
      }));
      return 'failed';
    },
    
    reset() {
      set(initialState);
    }
  };
};

export const parkingStore = createParkingStore();

export const loading = derived(
  parkingStore,
  $store => $store.loading
);

export const error = derived(
  parkingStore,
  $store => $store.error
);