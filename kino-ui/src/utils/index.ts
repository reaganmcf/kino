import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert a date object to a YYYY-MM-DD string
 */
export function dateToDateString(d: Date) {
  return d.toISOString().split('T')[0]
}
