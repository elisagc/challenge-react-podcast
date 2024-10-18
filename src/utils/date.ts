import { diffDays } from '@formkit/tempo';

export const hasOneDayPassed = (date: Date): boolean => {
  return diffDays(new Date(), date) > 0;
};
