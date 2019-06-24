import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee.class';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  employee: Employee;
  recordarme = false;
  constructor( private auth: AuthService,private router: Router) {
    this.employee = new Employee();
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit( form: NgForm ) {

    if ( form.invalid ) { return; }

    this.auth.nuevoemployee( this.employee )
      .subscribe( resp => {

        console.log(resp);


        if ( this.recordarme ) {
          localStorage.setItem('email', this.employee.email);
        }

        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);

      });
  }


}
