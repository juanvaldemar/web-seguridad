import { Injectable } from '@angular/core';
import {
  AngularFireDatabase
} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFireDatabase) {}

  getUsers = (tipoCategoria) => {
    return tipoCategoria
      ? this.db
          .list("Users", ref =>
            ref.orderByChild('title').equalTo(tipoCategoria)
          )
          .valueChanges()
      : this.db.list("Users").valueChanges();
  };

  save(newEmployee) {
    this.db.object('Employees').set(newEmployee);
  }

}
