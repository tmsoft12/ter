export interface ParkingSession {
  licensePlate: string;
  entryTime: Date;
  exitTime?: Date;
  paid: boolean;
  amount?: number;
}

export interface RFIDCard {
  id: string;
  balance: number;
}

export type PaymentStatus = 'pending' | 'success' | 'failed';