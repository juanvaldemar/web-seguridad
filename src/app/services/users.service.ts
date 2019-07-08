import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import {
  AngularFireDatabase
} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  crearCuentas = false;

  constructor(private db: AngularFireDatabase) { }

  getUsers = (tipoCategoria, cargo) => {
    return tipoCategoria
      ? this.db
        .list("Users", ref =>
          ref.orderByChild('title').equalTo(tipoCategoria)
        )
        .valueChanges()
      : this.db.list("Users").snapshotChanges().pipe(
        map(changes => {
          const sinFiltrar = changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val()
          }));
          if (cargo === "Administrador") {
            return sinFiltrar;
          }
          if (cargo === "Policía") {
            return sinFiltrar.filter(
              value =>
                value["title"] === "Asalto" ||
                value["title"] === "Secuestro" ||
                value["title"] === "Prostitución" ||
                value["title"] === "Asesinato" ||
                value["title"] === "Otro"
            );
          }
          if (cargo === "Bombero") {
            return sinFiltrar.filter(
              value =>
                value["title"] === "Incendio" ||
                value["title"] === "Accidente"
            );
          }
        })
      );
  }

  save(newEmployee) {
    return this.db.list('Employees').push(newEmployee);
  }

  getEmployee = (email) => {
    return this.db
      .list("Employees", ref =>
        ref.orderByChild('email').equalTo(email)
      )
      .valueChanges();

  }

}
