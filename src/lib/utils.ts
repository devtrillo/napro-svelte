import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str?: string): string {
  if (typeof str !== 'string') return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
}
