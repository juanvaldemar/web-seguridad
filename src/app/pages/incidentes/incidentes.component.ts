import { Component, OnInit } from '@angular/core';
import { IncidentesService } from 'src/app/services/incidentes.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class IncidentesComponent implements OnInit {

  loading;
  incidentes;
  valorSeleccionado: number;
  fechaSeleccionada1: Date;
  fechaSeleccionada2: Date;
  quitarFiltro = false;
  cargo = '';

  constructor(private incidentesService: IncidentesService, private excelService: ExcelService) {
    this.loading = true;
    this.incidentes = [];
  }

  ngOnInit() {
    if (localStorage.getItem('cargo')) {
      this.cargo = localStorage.getItem('cargo');
    } else {
      this.cargo = 'Administrador';
    }
    this.valorSeleccionado = 1;
    this.filterBy(this.valorSeleccionado);
  }

  filterBy = (value, fechaInicio?, fechaFin?) => {
    this.incidentesService.getIncidentes2('estado', value, this.cargo, fechaInicio, fechaFin).subscribe(res => {
      res = res.filter(valor => valor !== undefined);
      res.forEach(value => {
        if (value) {
          const f = new Date(value['fechaRegistro'].time);
          const hora = [
            f.getDate(),
            f.getMonth(),
            f.getFullYear(),
            f.getHours(),
            f.getMinutes(),
            f.getSeconds()
          ];

          const h = hora.map(v => {
            return v < 10 ? '0' + v : v;
          });

          const fecha = `${h[0]}-${h[1]}-${h[2]} ${h[3]}:${h[4]}:${h[5]}`;
          value['fecha'] = fecha;
        }
      });
      console.log(res);
      this.incidentes = res;
      this.loading = false;
    });
  };

  exportAsXLSX = () => {
    this.excelService.exportAsExcelFile(this.incidentes, 'incidentes');
  }

  filtrarPorFecha = (value?) => {
    // if (form.invalid) {
    //   console.log('Completar todos los campos')
    //   return;
    // }
    if (value) {
      this.valorSeleccionado = value;
    }
    if (this.fechaSeleccionada1 && this.fechaSeleccionada2) {
      this.quitarFiltro = true;
      console.log(this.valorSeleccionado, this.fechaSeleccionada1, this.fechaSeleccionada2);
      this.filterBy(this.valorSeleccionado, this.fechaSeleccionada1, this.fechaSeleccionada2);
    } else {
      console.log(this.valorSeleccionado, this.fechaSeleccionada1, this.fechaSeleccionada2);
      this.filterBy(this.valorSeleccionado);
    }
  }

  quitarFiltroFecha = () => {
    this.fechaSeleccionada1 = null;
    this.fechaSeleccionada2 = null;
    this.quitarFiltro = false;
    this.filtrarPorFecha();
  }
}
