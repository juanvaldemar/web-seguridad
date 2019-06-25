import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee.class';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  employee: Employee;
  cargos = ['Bombero', 'Policía'];
  saveUserSuccess = false;
  constructor(private auth: AuthService, private userService: UsersService) {
    this.employee = new Employee();
  }

  ngOnInit() {
  }

  createEmployee = async (form: NgForm) => {
    if (form.invalid) {
      console.log('Llenar todos los campos')
      return;
    }

    this.auth.nuevoemployee(this.employee)
      .subscribe(resp => {
        console.log('usuario creado');

      }, (err) => {
        console.log(err.error.error.message);
      });

    this.userService.save(this.employee).then(res => {
      this.saveUserSuccess = true;
      setTimeout(() => {
        this.saveUserSuccess = false;
      }, 2000);
    });
  }

}
