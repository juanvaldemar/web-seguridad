import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  categorias = [
    "Todas",
    "Incendio",
    "Asalto",
    "Secuestro",
    "Prostitución",
    "Asesinato"
  ];
  categoriaSeleccionada = 'Todas'
  loading: boolean = true
  usuarios = [];
  cargo = '';
  constructor(private usersService: UsersService, private excelService: ExcelService) {
  }

  ngOnInit() {
    if (localStorage.getItem('cargo')) {
      this.cargo = localStorage.getItem('cargo');
      if (this.cargo === 'Policía') {
        this.categorias = [
          "Todas",
          "Asalto",
          "Secuestro",
          "Prostitución",
          "Asesinato"
        ];
      }
      if (this.cargo === 'Bombero') {
        this.categorias = [
          "Todas",
          "Incendio",
          "Accidente",
        ];
      }
    } else {
      this.cargo = 'Administrador';
      this.categorias = [
        "Todas",
        "Asalto",
        "Secuestro",
        "Prostitución",
        "Asesinato",
        "Incendio",
        "Accidente",
        "Otro"
      ];
    }
    this.filterBy(null)
  }

  filterBy = (value) => {
    value === 'Todas' ? value = null : null;
    this.usersService.getUsers(value, this.cargo).subscribe(res => {
      this.usuarios = res;
      this.loading = false;
    });
  }

  exportAsXLSX = () => {
    this.excelService.exportAsExcelFile(this.usuarios, 'users');
  }

}
