import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Incidente } from "../models/Incidente.class";

import {
  AngularFireDatabase
} from "@angular/fire/database";


@Injectable({
  providedIn: "root"
})
export class IncidentesService {
  configUrl = "https://seguridadciudadana-5ba3d.firebaseio.com";

  incidentes: Incidente[];

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  getIncidentes2 = () => {
    return this.db.list('Incidentes').valueChanges();
  };

  getIncidentes = () => {
    return this.http
      .get(`${this.configUrl}/Incidentes.json`)
      .pipe(map(this.converToArray));
  };

  converToArray = (incidentes: object) => {
    if (incidentes === null) {
      return [];
    }
    const arrayIncidentes: Incidente[] = [];
    Object.keys(incidentes).forEach(value => {
      const incidente: Incidente = incidentes[value];
      incidente.id = value;
      arrayIncidentes.push(incidente);
    });
    console.log(arrayIncidentes);
    return arrayIncidentes;
  };
}
