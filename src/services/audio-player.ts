export class AudioPlayerService {

  private selectedTrack: any;
  private audioPlayer: any[] = [];
  private audio: HTMLAudioElement;
  private progressInterval: any;

  playTrack(track: any) {
    this.stopAllTracks();
    this.selectedTrack = track;

    this.audio = new Audio(this.selectedTrack.src);
    this.audioPlayer.push(this.audio);
    this.audioPlayer[0].play();
    this.selectedTrack.playing = true;

    this.calculateTrackProgress();
  }

  resumeTrack() {
    this.audioPlayer[0].play();
    this.selectedTrack.playing = true;

    this.calculateTrackProgress();
  }

  calculateTrackProgress() {
    this.progressInterval = setInterval(() => {

        if ( this.audioPlayer[0].currentTime < this.audioPlayer[0].duration ) {
          this.selectedTrack.progress = (this.audioPlayer[0].currentTime / this.audioPlayer[0].duration) * 100;
        } else if ( this.audioPlayer[0].currentTime >= this.audioPlayer[0].duration ) {
          // alert('true')
          this.selectedTrack.playing = false;
          this.selectedTrack.progress = 0;
          clearInterval(this.progressInterval);
        }
        // console.log( this.selectedTrack.progress );

    }, 500 ); // .5 secs
  }

  pauseTrack() {
    this.audioPlayer[0].pause();
    this.selectedTrack.playing = false;

    clearInterval(this.progressInterval);
  }

  // playPreviousTrack(track: any) {
  //   this.stopAllTracks();
  //   this.selectedTrack = track;

  //   this.audio = new Audio(this.selectedTrack.src);
  //   this.audioPlayer.push(this.audio);
  //   this.audioPlayer[0].play();
  //   this.selectedTrack.playing = true;

  //   this.calculateTrackProgress();
  // }

  // playNextTrack(track: any) {
  //   this.stopAllTracks();
  //   this.selectedTrack = track;

  //   this.audio = new Audio(this.selectedTrack.src);
  //   this.audioPlayer.push(this.audio);
  //   this.audioPlayer[0].play();
  //   this.selectedTrack.playing = true;

  //   this.calculateTrackProgress();
  // }

  stopAllTracks() {
    if ( this.selectedTrack !== undefined ) {
      this.selectedTrack.playing = false;
    }
    if ( this.audioPlayer[0] !== undefined ) {
      this.audioPlayer[0].pause();
      clearInterval(this.progressInterval);
    }
    this.audioPlayer = [];
  }

}
