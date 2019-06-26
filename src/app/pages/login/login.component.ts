import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/Employee.class';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employee: Employee;
  recordarme = false;
  cargos = ['Bombero', 'Policía'];

  constructor(private auth: AuthService, private router: Router) {
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
    console.log(this.employee)
    if (form.invalid) { return; }

    this.auth.login(this.employee)
      .subscribe(resp => {

        console.log(resp);

        if (this.recordarme) {
          localStorage.setItem('email', this.employee.email);
        }


        this.router.navigateByUrl('/home');

      }, (err) => {

        console.log(err.error.error.message);
      });

  }
}
