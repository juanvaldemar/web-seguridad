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
  categoriaSeleccionada = "Todas";
  lat: number = -12.085253949;
  lng: number = -77.09379897;
  incidentes = [];
  infoWindowOpen: boolean = false;
  infoWindowOpened = null;
  previousInfoWindow = null;
  imgSelected = '';

  constructor(private incidentesService: IncidentesService) {
    this.incidentes = [];
  }

  ngOnInit() {
    this.filterBy(null);
  }

  filterBy = value => {
    value === "Todas" ? (value = null) : null;
    this.incidentesService.getIncidentes2('categoria', value).subscribe(res => {
      console.log(res)
      this.incidentes = res;
      this.loading = false;
    });
  };

  markerClick = (infoWindow) => {
    if (this.previousInfoWindow == null) {
      this.previousInfoWindow = infoWindow;
    } else {
      this.infoWindowOpened = infoWindow;
      this.previousInfoWindow.close();
    }
    this.previousInfoWindow = infoWindow;
  }

  updateIncidente = (key, estado) => {
    this.incidentesService.updateItem(key, estado);
  }

}
