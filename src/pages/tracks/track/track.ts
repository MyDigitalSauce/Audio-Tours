import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NetworkService } from '../../../services/network';
import { AudioPlayerService } from '../../../services/audio-player';

@Component({
  selector: 'page-track',
  templateUrl: 'track.html',
})
export class TrackPage {

  private room: any;
  private track: any;
  private prevTrack: any;
  private nextTrack: any;
  private pins: any[];
  private locatedPin: any;

  constructor( public networkService: NetworkService, public navCtrl: NavController,
    public navParams: NavParams, public audioPlayerService: AudioPlayerService ) {
    this.room = this.navParams.get('room');
    this.track = this.navParams.get('track');
    this.pins = this.navParams.get('pins');
    this.prevTrack = this.navParams.get('prevTrack');
    this.nextTrack = this.navParams.get('nextTrack');

    this.locatePin( this.track.id );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackPage');
  }

  locatePin( track_id: number ) {
    this.pins.forEach( (pin) => {
      if (pin.id === track_id) {
        this.locatedPin = pin;
      }
    });
  }

  onPlayTrack(track: any) {
    this.audioPlayerService.playTrack(track);
  }

  onResumeTrack() {
    this.audioPlayerService.resumeTrack();
  }

  onPauseTrack() {
    this.audioPlayerService.pauseTrack();
  }

  onGoToTrack(this_track) {
    this.prevTrack = ( this_track.id === 0 ) ? this.getTrackById(this.room.tracks.length - 1) : this.getTrackById(this_track.id - 1);
    this.nextTrack = ( (this_track.id + 1) === this.room.tracks.length ) ? this.getTrackById(0) : this.getTrackById(this_track.id + 1);
    this.navCtrl.push( TrackPage, { room: this.room, track: this_track, pins: this.room.pins, prevTrack: this.prevTrack, nextTrack: this.nextTrack, } );
  }

  getTrackById(track_id: number) {
    let this_track: any;
    this.room.tracks.forEach( (track) => {
      if (track.id === track_id) {
        this_track = track;
        // console.log(track);
        // alert("found");
      }
    });
    return this_track;
  }

}
