import { Headers } from "@/types";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// basic auth header to backend requests in axios
export const headers: Headers = {
  headers: { 
      'X-API-KEY': 'DwightSchrute',            
    }
};

// axios set up
export const baseUrl: string = 'http://localhost:8080';
export const client = axios.create({
  baseURL: baseUrl,
});