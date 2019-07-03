import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/Employee.class';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employee: Employee;
  recordarme = false;
  cargos = ['Bombero', 'Policía'];
  errorMessage = '';

  constructor(private auth: AuthService, private userService: UsersService, private router: Router) {
    this.employee = new Employee();
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/home');
    }
    if (localStorage.getItem('email')) {
      this.employee.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    console.log(form)
    console.log(this.employee)
    if (form.invalid) {
      console.log('Completar todos los campos')
      return;
    }

    this.auth.login(this.employee)
      .subscribe(resp => {

        console.log(resp);

        localStorage.setItem('cargo', this.employee.type)
        this.userService.getEmployee(this.employee.email).subscribe(resp => {
          if (resp.length === 0) {
            this.userService.crearCuentas = true;
          }
        })
        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);
        const error = err.error.error.message;
        if (error === "EMAIL_NOT_FOUND" || error === "INVALID_PASSWORD") {
          this.errorMessage = 'Correo o contraseña invalidos';
        }
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      });

  }
}
