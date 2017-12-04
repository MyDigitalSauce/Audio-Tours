import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NetworkService } from '../../services/network';
import { AudioPlayerService } from '../../services/audio-player';

import { TrackPage } from './track/track';

@Component({
  selector: 'page-tracks',
  templateUrl: 'tracks.html',
})
export class TracksPage {

  private room: any;
  private tracks: any[];
  private prevTrack: any;
  private nextTrack: any;

  constructor( public networkService: NetworkService, public navCtrl: NavController,
    public navParams: NavParams, public audioPlayerService: AudioPlayerService ) {

    // console.log( this.networkService.connected );

    this.room = this.navParams.get('room');
    console.log( this.room );

    // this.room.tracks = [{
    //   id: 0,
    //   img: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Don_Lorenzo_Monaco_Adoration_of_the_Magi.jpg?alt=media&token=a328829b-c9da-47bf-8bca-00cfb6acd45c',
    //   src: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Botticelli_Birth_of_Venus.mp3?alt=media&token=6739ba78-0663-4a65-840b-c8915515e259',
    //   title: 'Adoration of the Magi',
    //   artist: 'Lorenzo Monaco',
    //   description: 'The painting is known by a rather complete documentation. It was executed by Lorenzo with the help of three assistants, and, despite the reduced size, it was paid the huge sum of 182 florins. According to some hints in Giorgio Vasari\'s Lives of the Most Excellent Painters, it could have been executed for the church of Sant\'Egidio in Florence, when it was reconsecrated by Pope Martin V. Detail of the hound. Later it is documented in a room facing the cloister of the monastery of San Marco, where it was seen by Fra Angelico. A source from 1810 reports how the work was initially attributed to Fra Angelico himself. It was restored in 1995.',
    //   playing: false,
    //   progress: 0,
    // },
    // {
    //   id: 1,
    //   img: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Sandro_Botticelli_Birth_of_Venus.jpg?alt=media&token=83a070a6-5261-432b-9793-dbd23b05cf37',
    //   src: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Botticelli_Birth_of_Venus.mp3?alt=media&token=6739ba78-0663-4a65-840b-c8915515e259',
    //   title: 'Birth of Venus',
    //   artist: 'Sandro Botticelli',
    //   description: 'The Birth of Venus (Italian: Nascita di Venere [ˈnaʃʃita di ˈvɛːnere]) is a painting by Sandro Botticelli probably made in the mid 1480s. It depicts the goddess Venus arriving at the shore after her birth, when she had emerged from the sea fully-grown (called Venus Anadyomene and often depicted in art). The painting is in the Uffizi Gallery in Florence, Italy.',
    //   playing: false,
    //   progress: 0,
    // },
    // {
    //   id: 2,
    //   img: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Verrocchio_and_Leonardo_da_Vinci_Baptism_of_Christ.jpg?alt=media&token=f641cddf-1abe-4315-a8e0-1e5d6f393a8c',
    //   src: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Verrocchio_and_Leonardo_Baptism_of_Christ.mp3?alt=media&token=47743b1a-bc6b-45dc-b1ef-1a9e52f3ba74',
    //   title: 'Baptism of Christ',
    //   artist: 'Verrocchio and Leonardo da Vinci',
    //   description: 'The Baptism of Christ is a painting finished around 1475 in the studio of the Italian Renaissance painter Andrea del Verrocchio and generally ascribed to him and his pupil Leonardo da Vinci. Some art historians discern the hands of other members of Verrocchio\'s workshop in the painting as well. The picture depicts the Baptism of Jesus by John the Baptist as recorded in the Biblical Gospels of Matthew, Mark and Luke. The angel to the left is recorded as having been painted by the youthful Leonardo, a fact which has excited so much special comment and mythology, that the importance and value of the picture as a whole and within the œuvre of Verrocchio is often overlooked. Modern critics also attribute much of the landscape in the background and the figure of Christ to Leonardo da Vinci as well.[1] The painting is housed in the Uffizi Gallery in Florence.',
    //   playing: false,
    //   progress: 0,
    // },
    // {
    //   id: 3,
    //   img: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Titian_Venus_of_Urbino.jpg?alt=media&token=4d9d022e-c2f4-412f-a191-94cf2a973b2d',
    //   src: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Verrocchio_and_Leonardo_Baptism_of_Christ.mp3?alt=media&token=47743b1a-bc6b-45dc-b1ef-1a9e52f3ba74',
    //   title: 'Venus of Urbino',
    //   artist: 'Titian',
    //   description: 'The Venus of Urbino is an oil painting by the Italian painter Titian, which seems to have been begun in 1532 or 1534, and was perhaps completed in 1534, but not sold until 1538. It depicts a nude young woman, traditionally identified with the goddess Venus, reclining on a couch or bed in the sumptuous surroundings of a Renaissance palace. It is now in the Galleria degli Uffizi in Florence.',
    //   playing: false,
    //   progress: 0,
    // },
    // {
    //   id: 4,
    //   img: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Michelangelo_Doni_Tondo.jpg?alt=media&token=9eec8e30-3e8d-4712-8c65-e5241e52dff8',
    //   src: 'https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Verrocchio_and_Leonardo_Baptism_of_Christ.mp3?alt=media&token=47743b1a-bc6b-45dc-b1ef-1a9e52f3ba74',
    //   title: 'Doni Tondo',
    //   artist: 'Michelangelo',
    //   description: 'The Doni Tondo or Doni Madonna, is the only finished panel painting by the mature Michelangelo to survive. Now in the Uffizi in Florence, Italy, and still in its original frame, the Doni Tondo was probably commissioned by Agnolo Doni to commemorate his marriage to Maddalena Strozzi, the daughter of a powerful Tuscan family. The painting is in the form of a tondo, meaning in Italian, \'round\', a shape which is frequently associated during the Renaissance with domestic ideas.',
    //   playing: false,
    //   progress: 0,
    // }];

    // this.room.pins = [{
    //   id: 0,
    //   x_coord: 70,
    //   y_coord: 96,
    // },
    // {
    //   id: 1,
    //   x_coord: 80,
    //   y_coord: 48,
    // },
    // {
    //   id: 2,
    //   x_coord: 152,
    //   y_coord: 80,
    // },
    // {
    //   id: 3,
    //   x_coord: 136,
    //   y_coord: 224,
    // },
    // {
    //   id: 4,
    //   x_coord: 204,
    //   y_coord: 188,
    // }];
    // console.log( this.room );
  }

  onPlayTrack(track: any) {
    this.prevTrack = ( track.id === 0 ) ? this.getTrackById(this.room.tracks.length - 1) : this.getTrackById(track.id - 1);
    this.nextTrack = ( (track.id + 1) === this.room.tracks.length ) ? this.getTrackById(0) : this.getTrackById(track.id + 1);
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





