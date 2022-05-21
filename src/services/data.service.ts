import { Injectable } from "@angular/core";
import { collectionData, Firestore, Timestamp, serverTimestamp } from "@angular/fire/firestore";
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { Observable } from "rxjs";
import { GlobalUser } from "src/app/home/home.page";

export interface IUSER {
    Id: string;
    Active: boolean;
    CreateDate: Timestamp;
    Name: string;
    UserName: string;
}

export interface ICHAT {
    Active: boolean;
    CreateDate: Timestamp;
    Chat: string;
    SenderId: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    /**
     *
     */
    constructor(
        private firestore: Firestore,
        private globalUser: GlobalUser,
    ) { }

    getAllUser(): Observable<IUSER[]>{
        const usersRef = collection(this.firestore, 'USER');
        return collectionData(usersRef, { idField: 'Id' }) as Observable<IUSER[]>;
    }

    getAllChat(): Observable<ICHAT[]> {
        const chatRef = collection(this.firestore, 'CHAT');
        let chatRefQuery = query(chatRef, where('Active', '==', true), orderBy('CreateDate', 'asc'));

        return collectionData(chatRefQuery, { idField: 'Id' }) as Observable<ICHAT[]>;
    }

    async addChat(strChat: string) {
        if (this.globalUser.UserId != null && this.globalUser.UserId !== '') {
            let chatObj: ICHAT = {
                Active: true,
                CreateDate: Timestamp.now(),
                Chat: strChat,
                SenderId: this.globalUser.UserId
            };
            console.log(chatObj);
            const chatRef = collection(this.firestore, 'CHAT');
            return await addDoc(chatRef, chatObj);
        } else {
            return null;
        }
    }
}