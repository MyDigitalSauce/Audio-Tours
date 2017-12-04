import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TracksPage } from '../tracks/tracks';
import { LocationsPage } from '../locations/locations';

@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {

  private building: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.building = this.navParams.get('building');
    console.log( this.building );
  }

  onGoToTracks(this_room: any) {
    this.navCtrl.push( TracksPage, { room: this_room } );
  }

  onGoToLocations(this_room: any) {
    this.navCtrl.push( LocationsPage, { room: this_room } );
  }

}
