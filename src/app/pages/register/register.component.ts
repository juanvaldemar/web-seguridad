import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  employee: Employee;

  constructor() {
    this.employee = new Employee();
  }

  ngOnInit() { }

  onSubmit = () => {
    console.log(this.employee)
  }


}
