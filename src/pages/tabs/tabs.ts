import { Component } from '@angular/core';

import { RoomsPage } from '../rooms/rooms';
import { TracksPage } from '../tracks/tracks';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  roomsRoot = RoomsPage;
  tracksRoot = TracksPage;

  constructor() {

  }
}
