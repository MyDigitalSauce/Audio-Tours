import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../services/data';

import { BuildingsPage } from '../buildings/buildings';

@Component({
  selector: 'page-exhibits',
  templateUrl: 'exhibits.html',
})
export class ExhibitsPage {

  private data: any = {};
  private exhibits: any[] = [];
  private loading: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public dataService: DataService,
    public loadingCtrl: LoadingController, ) {

    this.getExhibits();

  }

  getExhibits() {

    this.onLoading('Loading exhibits..');
    this.dataService.fetchExhibits().subscribe( (this_data) => {
      this.data = this_data;
      this.exhibits = this_data;
      this.loading.dismiss();
      console.log( this.data );
    });

    // this.authService.getActiveUser().getIdToken()
    //   .then(
    //     ( token: string ) => {
    //       this.onLoading('Loading Users');
    //       this.dataService.fetchBuildings( token ).subscribe( (data) => {

    //         // alert('test');
    //         // console.log(data);

    //         for (let key in data) {
    //           if( data.hasOwnProperty(key) ) {
    //             this.users.push( data[key] );
    //           }
    //         }
    //         this.onSortUsers(true);
    //         this.loading.dismiss();

    //       }, (err) => {
    //         console.log(err);
    //         this.loading.dismiss();
    //         this.onHandleError(err);
    //       });
    //     }
    //   );

  }

  onLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  onGoToBuildings(this_exhibit: any) {
    this.navCtrl.push( BuildingsPage, { exhibit: this_exhibit } );
  }

}
