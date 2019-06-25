import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee.class';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  employee:Employee;
  constructor() {
    this.employee = new Employee();
   }

  ngOnInit() {
  }

  createEmployee = () => {
    console.log(this.employee)
  }

}
