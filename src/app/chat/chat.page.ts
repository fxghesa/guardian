import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { combineLatest } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DataService, ICHAT, IUSER } from 'src/services/data.service';
import { GlobalUser } from '../home/home.page';

interface CHAT {
  Name: string;
  Chat: string;
  CreateDate: Timestamp;
  SenderId: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  currentUser: GlobalUser;
  chats: CHAT[] = [];
  
  chatToSend: string = '';

  constructor(
    private dataService: DataService,
    private globalUser: GlobalUser,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.globalUser;
    this.getChats();
  }

  getChats() {
    combineLatest([
      this.dataService.getAllUser(),
      this.dataService.getAllChat()
    ]).subscribe(([resAllUser, resAllChat]) => {
      if (resAllUser != null && resAllChat != null) {
        this.chats = [];
        for (const iterator of resAllChat) {
          this.chats.push({
            Name: resAllUser.find(x => x.Id === iterator.SenderId).Name,
            Chat: iterator.Chat,
            CreateDate: iterator.CreateDate,
            SenderId: iterator.SenderId
          });
        }
      }
    });
  }

  sendChat() {
    console.log(this.chatToSend)
    if (this.chatToSend != null && this.chatToSend !== '') {
      this.dataService.addChat(this.chatToSend);
      this.chatToSend = '';
    }
  }

  signOut() {
    this.globalUser = null;
    this.router.navigate(['/home']);
  }

}
