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

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  getIncidentes2 = (campo, valor, cargo, fechaInicio?, fechaFin?) => {
    return valor
      ? this.db
        .list("Incidentes", ref => ref.orderByChild(campo).equalTo(valor))
        .snapshotChanges()
        .pipe(
          map(changes => {
            const sinFiltrar = changes.map(c => {
              const cPayloadVal = c.payload.val();
              if (fechaInicio && fechaFin) {
                const time = cPayloadVal["fechaRegistro"].time;
                console.log(fechaInicio, fechaFin, time);
                if (fechaInicio <= time && time <= fechaFin) {
                  return { key: c.payload.key, ...cPayloadVal };
                }
              } else {
                return { key: c.payload.key, ...cPayloadVal };
              }
            });
            if (cargo === "Administrador") {
              return sinFiltrar;
            }
            if (cargo === "Policía") {
              return sinFiltrar.filter(
                value =>
                  value["categoria"] === "Asalto" ||
                  value["categoria"] === "Secuestro" ||
                  value["categoria"] === "Prostitución" ||
                  value["categoria"] === "Asesinato" ||
                  value["categoria"] === "Otro"
              );
            }
            if (cargo === "Bombero") {
              return sinFiltrar.filter(
                value =>
                  value["categoria"] === "Incendio" ||
                  value["categoria"] === "Accidente"
              );
            }
          }
          )
        )
      : this.db
        .list("Incidentes")
        .snapshotChanges()
        .pipe(
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
                  value["categoria"] === "Asalto" ||
                  value["categoria"] === "Secuestro" ||
                  value["categoria"] === "Prostitución" ||
                  value["categoria"] === "Asesinato" ||
                  value["categoria"] === "Otro"
              );
            }
            if (cargo === "Bombero") {
              return sinFiltrar.filter(
                value =>
                  value["categoria"] === "Incendio" ||
                  value["categoria"] === "Accidente"
              );
            }
          })
        );
  };

  updateItem(key: string, newBody) {
    this.db.list("Incidentes").update(key, newBody);
  }
}
