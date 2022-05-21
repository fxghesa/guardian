import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, USER } from 'src/services/data.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userList: USER[] = [];
  selectedUserId: string = '';

  constructor(
    private globalUser: GlobalUser,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((result: any) => {
      if (result != null) {
        this.userList = result as USER[];
      }
    });
  }

  onSelectedUser(): void {
    this.globalUser.UserId = this.selectedUserId;
    this.router.navigate(['/tab/chat'])
  }

}

@Injectable()
export class GlobalUser {
  UserId: string;
}
