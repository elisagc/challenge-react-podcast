import { Podcast } from '../interfaces/podcast';
import { hasOneDayPassed } from './date';

export const getStoredPodcasts = (): Podcast[] | null => {
  const podcastData = localStorage.getItem('podcastsData');
  return podcastData ? JSON.parse(podcastData) : null;
};

export const getStoredFetchDate = (key: string): Date | null => {
  const lastFetch = localStorage.getItem(key);
  return lastFetch ? new Date(lastFetch) : null;
};

export const isDateStoredValid = (key: string): boolean => {
  const lastFetchDate = getStoredFetchDate(key);
  return lastFetchDate ? !hasOneDayPassed(lastFetchDate) : false;
};
