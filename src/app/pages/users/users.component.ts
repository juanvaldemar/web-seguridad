import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loading:boolean = true
  usuarios = [];
  constructor(private usersService: UsersService, private excelService: ExcelService) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(res => {
      this.usuarios = res;
      this.loading = false;
    });
  }

  exportAsXLSX = () => {
    this.excelService.exportAsExcelFile(this.usuarios, 'users');
  }

}
