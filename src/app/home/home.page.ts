import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, IUSER } from 'src/services/data.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userList: IUSER[] = [];
  selectedUserId: string = '';

  constructor(
    private globalUser: GlobalUser,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getAllUser().subscribe((result: any) => {
      if (result != null) {
        this.userList = result as IUSER[];
      }
    });
  }

  onSelectedUser(): void {
    this.globalUser.UserId = this.selectedUserId;
    this.globalUser.Name = this.userList.find(x => x.Id === this.selectedUserId).Name;
    this.router.navigate(['/tab/chat']);
  }

}

@Injectable()
export class GlobalUser {
  UserId: string;
  Name: string;
}
