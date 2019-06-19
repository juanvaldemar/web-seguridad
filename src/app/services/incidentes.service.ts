import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Incidente } from "../models/Incidente.class";

import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class IncidentesService {

  incidentes: Incidente[];

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
  }

  getIncidentes2 = (campo, valor) => {
    return valor
      ? this.db
        .list("Incidentes", ref =>
          ref.orderByChild(campo).equalTo(valor)
        )
        .snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        )
      : this.db.list("Incidentes").snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  updateItem(key: string, newState: number) {
    this.db.list("Incidentes").update(key, { estado: newState });
  }

}
