export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface ParkingCalculationRequest {
  licensePlate: string;
  entryTime: string;
  exitTime: string;
}

export interface ParkingCalculationResponse {
  amount: number;
  currency: string;
  duration: {
    hours: number;
    minutes: number;
  };
}

export interface PaymentRequest {
  sessionId: string;
  rfidCardId: string;
  amount: number;
}

export interface PaymentResponse {
  transactionId: string;
  status: 'success' | 'failed';
  timestamp: string;
}