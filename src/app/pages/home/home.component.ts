import { Component, OnInit } from "@angular/core";
import { Incidente } from "src/app/models/Incidente.class";
import { IncidentesService } from "src/app/services/incidentes.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  lat: number = -12.085253949;
  lng: number = -77.09379897;
  incidentes =[];
  infoWindowOpen:boolean= false;

  constructor(private incidentesService: IncidentesService) {
    this.incidentes = [];
  }

  ngOnInit() {
    this.incidentesService.getIncidentes2().subscribe(res => {
      this.incidentes = res;
      console.log(res)
    });
  }

  obtenerIncidentes() {
    this.incidentesService.getIncidentes().subscribe(
      res => (this.incidentes = res),
      error => {
        console.log(error);
      }
    );
  }

  markerClick = (indice) => {
    console.log(indice)
  }
}
