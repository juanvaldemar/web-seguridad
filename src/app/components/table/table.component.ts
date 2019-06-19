import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() arrayIncidentes = [];
  incidenteSeleccionado;
  tipoModal: String;
  constructor() {
    this.tipoModal = '';
  }

  ngOnInit() {
  }

  openMapModal(incidente, tipoModal) {
    this.tipoModal = tipoModal;
    this.incidenteSeleccionado = incidente;
  }

}
