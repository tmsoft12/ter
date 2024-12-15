import { API_BASE_URL, API_ENDPOINTS } from './config';
import type { 
  APIResponse,
  ParkingCalculationRequest,
  ParkingCalculationResponse,
  PaymentRequest,
  PaymentResponse
} from './types';

class ParkingAPI {
  private async fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: {
          code: 'API_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      };
    }
  }

  async calculateParkingFee(
    request: ParkingCalculationRequest
  ): Promise<APIResponse<ParkingCalculationResponse>> {
    return this.fetchAPI<ParkingCalculationResponse>(
      API_ENDPOINTS.parking.calculate,
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
  }

  async processPayment(
    request: PaymentRequest
  ): Promise<APIResponse<PaymentResponse>> {
    return this.fetchAPI<PaymentResponse>(
      API_ENDPOINTS.parking.payment,
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
  }
}

export const parkingAPI = new ParkingAPI();