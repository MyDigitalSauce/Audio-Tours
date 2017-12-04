import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../services/data';

import { RoomsPage } from '../rooms/rooms';

@Component({
  selector: 'page-buildings',
  templateUrl: 'buildings.html',
})
export class BuildingsPage {

  // private exhibit: any;
  private buildings: any[] = [];
  private loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataService: DataService, public loadingCtrl: LoadingController,
     ) {

    // this.exhibit = this.navParams.get('exhibit');

  }

  ionViewDidLoad() {
    this.getBuildings();
  }

  getBuildings() {

    this.onLoading('Loading buildings...');
    this.dataService.fetchBuildings().subscribe( (this_data) => {
      // if ( this_data !== null) {
        this.buildings = this_data;
        console.log( this.buildings );
      // }
      this.loading.dismiss();
    });

  }

  onLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  onGoToRooms(this_building: any) {
    this.navCtrl.push( RoomsPage, { building: this_building } );
  }

}
