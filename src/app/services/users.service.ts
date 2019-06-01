import { Injectable } from '@angular/core';
import {
  AngularFireDatabase
} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFireDatabase) {}

  getUsers = () => {
    return this.db.list('Users').valueChanges();
  };
}
