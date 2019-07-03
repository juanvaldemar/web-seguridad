import { Component, OnInit } from "@angular/core";
import { IncidentesService } from "src/app/services/incidentes.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  categorias = [];
  categoriaSeleccionada = "Todas";
  lat: number = -12.085253949;
  lng: number = -77.09379897;
  incidentes = [];
  infoWindowOpen: boolean = false;
  infoWindowOpened = null;
  previousInfoWindow = null;
  imgSelected = '';
  incidenteSeleccionado = {};
  comentario = '';

  constructor(private incidentesService: IncidentesService) {
    this.incidentes = [];
  }

  ngOnInit() {
    let cargo = localStorage.getItem('cargo');
    if (cargo === 'Policía') {
      this.categorias = [
        "Todas",
        "Asalto",
        "Secuestro",
        "Prostitución",
        "Asesinato"
      ];
    }
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

  updateIncidente = (incidente, estado) => {
    this.incidenteSeleccionado = incidente;
    this.incidentesService.updateItem(incidente.key, { estado });
  }

  addComent = () => {
    this.incidentesService.updateItem(this.incidenteSeleccionado['key'], { comentario: this.comentario });
  }

}
