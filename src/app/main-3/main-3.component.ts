import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TijdService } from '../tijd.service';

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
 displayPrompt: boolean = false; // Disable inputs after play
 isFirstPlay: boolean = true; // Detects first play
 isPausedBySystem: boolean = false; // Tracks if video is auto-paused

 private pauseSound: HTMLAudioElement; // Sound to play when paused

 constructor(private tijdService: TijdService) {
   // Load initial settings from the service
   this.loadSettings();

   // Initialize the sound (replace the path with your sound file)
   this.pauseSound = new Audio('assets/sound.mp3');
 }


 // Load settings from TijdService
 private loadSettings(): void {
   this.startTime = this.tijdService.getStartTime();
   this.minTime = this.tijdService.getMinTime();
   this.maxTime = this.tijdService.getMaxTime();
   this.minPauses = this.tijdService.getMinPauses();
   this.maxPauses = this.tijdService.getMaxPauses();
   this.displayPrompt = this.tijdService.getDisPrompt();
   console.log('Loaded settings:', this.startTime, this.displayPrompt);
 }

 // Main play/pause function with pause management
 playPauseVideo(video: HTMLVideoElement): void {
   // Case 1: Resume if paused by system
   if (this.isPausedBySystem) {
     this.isPausedBySystem = false; // Reset flag
     video.play(); // Resume playback
     return;
   }

   // Case 2: First play - generate pauses
   if (this.isFirstPlay) {
     this.generatePauses(video);
     this.isFirstPlay = false; // Ensure pause generation happens once
   }

   // Case 3: Toggle play/pause
   video.paused ? video.play() : video.pause();
 }

 // Generate random pause times based on user inputs
 private generatePauses(video: HTMLVideoElement): void {
   // Save the settings in the service
   this.tijdService.setValues(
     this.startTime,
     this.minTime,
     this.maxTime,
     this.minPauses,
     this.maxPauses
   );

   this.tijdService.setDisPrompt(true);
   this.displayPrompt = true;

   // Validate input ranges
   if (this.minTime > this.maxTime || this.minPauses > this.maxPauses) {
     alert('Invalid input: Ensure min values are less than max values.');
     return;
   }

   const videoDuration = video.duration;

   if (this.startTime >= videoDuration) {
     alert('Start time must be within the video duration.');
     return;
   }

   this.pauseTimes = [];
   const pauseCount = this.getRandomInt(this.minPauses, this.maxPauses);
   let currentTime = this.startTime;

   // Generate random pause times
   for (let i = 0; i < pauseCount; i++) {
     const nextPause = currentTime + this.getRandomInt(this.minTime, this.maxTime);

     if (nextPause >= videoDuration) break; // Ensure pauses are within bounds

     this.pauseTimes.push(nextPause);
     currentTime = nextPause;
   }

   console.log('Generated pause times:', this.pauseTimes);

   setInterval(() => { this.monitorVideo(video);}, 1000);
 }

 // Helper function to get a random integer between min and max (inclusive)
 private getRandomInt(min: number, max: number): number {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 
 // Monitor video playback and pause at the correct moments
 private monitorVideo(video: HTMLVideoElement): void {
   video.ontimeupdate = () => {
     const currentTime = Math.floor(video.currentTime);
     if (this.pauseTimes.includes(currentTime) && !this.isPausedBySystem) {
       console.log('Pausing at:', currentTime);
       video.pause();
       this.isPausedBySystem = true; // Mark as system pause
       this.pauseTimes = this.pauseTimes.filter((time) => time !== currentTime); // Remove the pause time

       setTimeout(() => {
         this.pauseSound.play();
       }, 2000);
       // Play the pause sound
       this.pauseSound.play();
     }
   };
 }
 notSound() {
   this.pauseSound.play();
 }
}
