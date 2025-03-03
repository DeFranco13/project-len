import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-3',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './main-3.component.html',
  styleUrl: './main-3.component.css'
})
export class Main3Component {

  // Form inputs (default values for pauses)
  startTime: number = 0;
  minTime: number = 5;
  maxTime: number = 10;
  minPauses: number = 3;
  maxPauses: number = 5;

  pauseTimes: number[] = [];
  isPausedByUser: boolean = false; // Tracks if user manually pauses
  isFirstPlay: boolean = true; // Flag for first play check

  // Play/Pause logic (generates pauses on first play)
  playPauseVideo(video: HTMLVideoElement) {
    if (video.paused) {
      if (this.isFirstPlay) {
        this.generatePauses(video); // Generate pauses on first play
        this.isFirstPlay = false;   // Disable further pause generation
      }
      video.play(); // Start or resume video
      this.isPausedByUser = false;
    } else {
      video.pause(); // Pause video manually
      this.isPausedByUser = true;
    }
  }

  // Generate random pause times based on user input
  private generatePauses(video: HTMLVideoElement) {
    const { startTime, minTime, maxTime, minPauses, maxPauses } = this;

    // Input validation
    if (minTime > maxTime || minPauses > maxPauses) {
      alert('Invalid ranges: Min values must be less than max values.');
      return;
    }

    const videoDuration = video.duration;

    if (startTime >= videoDuration) {
      alert('Start time must be within video duration.');
      return;
    }

    this.pauseTimes = []; // Clear previous pause times

    // Random number of pauses within the specified range
    const pauseCount =
      Math.floor(Math.random() * (maxPauses - minPauses + 1)) + minPauses;

    let currentTime = startTime;

    // Generate random pause times
    for (let i = 0; i < pauseCount; i++) {
      const nextPause =
        currentTime + Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

      if (nextPause >= videoDuration) break; // Ensure pauses are within the video length

      this.pauseTimes.push(nextPause);
      currentTime = nextPause;
    }

    console.log('Generated pause times:', this.pauseTimes);

    // Start monitoring the video for pause moments
    this.monitorVideo(video);
  }

  // Monitor video playback and pause at generated times
  private monitorVideo(video: HTMLVideoElement) {
    video.ontimeupdate = () => {
      // If current time is a pause time and the user hasn't manually paused
      if (
        this.pauseTimes.includes(Math.floor(video.currentTime)) &&
        !this.isPausedByUser
      ) {
        video.pause();
        this.isPausedByUser = true; // Ensure video remains paused until user resumes
      }
    };
  }
}


