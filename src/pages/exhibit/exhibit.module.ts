import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitPage } from './exhibit';

@NgModule({
  declarations: [
    ExhibitPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitPage),
  ],
})
export class ExhibitPageModule {}
