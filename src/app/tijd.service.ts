import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TijdService {
  // Form inputs (default values for pauses)
  private startTime: number = 0;
  private minTime: number = 5;
  private maxTime: number = 10;
  private minPauses: number = 3;
  private maxPauses: number = 5;

  private disPrompt: boolean = false; // Controls input lock

  constructor() {}

  // Set all values at once
  setValues(
    startTime: number,
    minTime: number,
    maxTime: number,
    minPauses: number,
    maxPauses: number
  ): void {
    this.startTime = startTime;
    this.minTime = minTime;
    this.maxTime = maxTime;
    this.minPauses = minPauses;
    this.maxPauses = maxPauses;
  }

  // Getters
  getStartTime(): number {
    return this.startTime;
  }

  getMinTime(): number {
    return this.minTime;
  }

  getMaxTime(): number {
    return this.maxTime;
  }

  getMinPauses(): number {
    return this.minPauses;
  }

  getMaxPauses(): number {
    return this.maxPauses;
  }

  // Control prompt display
  getDisPrompt(): boolean {
    return this.disPrompt;
  }

  setDisPrompt(value: boolean): void {
    this.disPrompt = value;
  }
}
