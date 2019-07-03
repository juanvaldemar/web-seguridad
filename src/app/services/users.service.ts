import { Injectable } from '@angular/core';
import {
  AngularFireDatabase
} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  crearCuentas = false;

  constructor(private db: AngularFireDatabase) { }

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
    return this.db.list('Employees').push(newEmployee);
  }

  getEmployee = (email) => {
    return this.db
      .list("Employees", ref =>
        ref.orderByChild('email').equalTo(email)
      )
      .valueChanges();

  };

}
