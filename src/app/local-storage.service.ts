import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): number {
    const value = localStorage.getItem(key);
    return value !== null ? parseInt(value, 10) : 0;
  }
}
