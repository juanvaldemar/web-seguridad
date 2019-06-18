import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() arrayIncidentes = [];
  latitude: number;
  longitude: number;
  title: String;
  description: String;
  constructor() {
    this.latitude = 0;
    this.longitude = 0;
    this.title = '';
    this.description= '';
  }

  ngOnInit() {
  }

  openMapModal(incidente) {
    this.latitude = incidente.latitud;
    this.longitude = incidente.longitud;
    this.title = incidente.categoria;
    this.description = incidente.descripcion;
  }

}
