import { Component, OnInit } from '@angular/core';
import { IncidentesService } from 'src/app/services/incidentes.service';
import { ExcelService } from 'src/app/services/excel.service';

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
      this.incidentes = res;
      this.loading = false;
    });
  };

  exportAsXLSX = () => {
    this.excelService.exportAsExcelFile(this.incidentes, 'incidentes');
  }

}
