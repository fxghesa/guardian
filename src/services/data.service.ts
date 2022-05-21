import { Injectable } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { collection } from "firebase/firestore";
import { Observable } from "rxjs";

export interface USER {
    Id: number;
    Active: boolean;
    CreateDate: Date;
    Name: string;
    UserName: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    /**
     *
     */
    constructor(
        private firestore: Firestore
    ) { }

    getAllUsers(): Observable<USER[]>{
        const users = collection(this.firestore, 'USER');
        return collectionData(users, { idField: 'Id' }) as Observable<USER[]>;
    }
}