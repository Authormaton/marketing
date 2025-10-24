import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function classNames(...args: ClassValue[]) {
  return cn(...args)
}

export function formatYear() {
  return new Date().getFullYear()
}
