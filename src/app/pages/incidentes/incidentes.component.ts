import { Component, OnInit } from '@angular/core';
import { IncidentesService } from 'src/app/services/incidentes.service';
import { ExcelService } from 'src/app/services/excel.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.css']
})
export class IncidentesComponent implements OnInit {

  loading;
  incidentes;
  constructor(private incidentesService: IncidentesService, private excelService: ExcelService) {
    this.loading = true;
    this.incidentes = [];
  }

  ngOnInit() {
    this.filterBy(1)
  }

  filterBy = value => {
    value === "Todas" ? (value = null) : null;
    this.incidentesService.getIncidentes2('estado', value).subscribe(res => {
      res.forEach(value => {
        let f = new Date(value['fechaRegistro'].time);
        let hora = [
          f.getDate(),
          f.getMonth(),
          f.getFullYear(),
          f.getHours(),
          f.getMinutes(),
          f.getSeconds()
        ];

        const h = hora.map(value => {
          return value < 10 ? '0' + value : value;
        })

        let fecha = `${h[0]}-${h[1]}-${h[2]} ${h[3]}:${h[4]}:${h[5]}`;
        value['fecha'] = fecha;
      })
      this.incidentes = res;
      this.loading = false;
    });
  };

  exportAsXLSX = () => {
    this.excelService.exportAsExcelFile(this.incidentes, 'incidentes');
  }

  obteniendoFecha = () => {
    $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4'
  });
  }

}
