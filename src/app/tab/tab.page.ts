import { Component, OnInit } from '@angular/core';
import { DataService, USER } from 'src/services/data.service';
import { GlobalUser } from '../home/home.page';

@Component({
  selector: 'tab',
  templateUrl: 'tab.page.html',
})
export class Tab {

  constructor(
    private globalUser: GlobalUser,
    private dataService: DataService
  ) {
      console.log(this.globalUser.UserId);
  }

}
