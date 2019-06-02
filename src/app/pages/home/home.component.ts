import { Component, OnInit } from "@angular/core";
import { IncidentesService } from "src/app/services/incidentes.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  categorias = [
    "Todas",
    "Incendio",
    "Asalto",
    "Secuestro",
    "Prostitución",
    "Asesinato"
  ];
  categoriaSeleccionada = 'Todas'
  lat: number = -12.085253949;
  lng: number = -77.09379897;
  incidentes = [];
  infoWindowOpen: boolean = false;

  constructor(private incidentesService: IncidentesService) {
    this.incidentes = [];
  }

  ngOnInit() {
    this.filterBy(null)
  }



  // obtenerIncidentes() {
  //   this.incidentesService.getIncidentes().subscribe(
  //     res => (this.incidentes = res),
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  filterBy = (value) => {
    value === 'Todas' ? value = null : null;
    this.incidentesService.getIncidentes2(value).subscribe(res => {
      this.incidentes = res;
      this.loading = false;
    });
  }

  markerClick = indice => {
    console.log(indice);
  };
}
