import type { PaymentStatus } from '../types/ParkingTypes';

interface StatusConfig {
  message: string;
  icon: string;
  color: string;
}

export function getStatusConfig(status: PaymentStatus): StatusConfig {
  const configs: Record<PaymentStatus, StatusConfig> = {
    success: {
      message: 'Payment Successful',
      icon: '✓',
      color: 'text-terminal-green'
    },
    failed: {
      message: 'Payment Failed',
      icon: '✗',
      color: 'text-red-500'
    },
    pending: {
      message: 'Processing Payment',
      icon: '⟳',
      color: 'text-terminal-blue'
    }
  };
  
  return configs[status];
}