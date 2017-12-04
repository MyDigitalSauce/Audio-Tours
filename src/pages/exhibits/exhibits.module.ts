import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitsPage } from './exhibits';

@NgModule({
  declarations: [
    ExhibitsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitsPage),
  ],
})
export class ExhibitsPageModule {}
