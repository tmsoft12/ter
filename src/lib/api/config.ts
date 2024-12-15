export const API_BASE_URL = 'https://api.parkingservice.com/v1';

export const API_ENDPOINTS = {
  parking: {
    sessions: '/parking/sessions',
    calculate: '/parking/calculate',
    payment: '/parking/payment'
  },
  rfid: {
    validate: '/rfid/validate',
    charge: '/rfid/charge'
  }
} as const;