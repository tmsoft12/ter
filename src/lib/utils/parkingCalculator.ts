const HOURLY_RATE = 10; // $10 per hour

export function calculateParkingFee(entryTime: Date, exitTime: Date): number {
  const duration = exitTime.getTime() - entryTime.getTime();
  const hours = Math.ceil(duration / (1000 * 60 * 60));
  return hours * HOURLY_RATE;
}