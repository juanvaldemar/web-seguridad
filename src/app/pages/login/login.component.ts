import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Employee } from "src/app/models/Employee.class";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  employee: Employee;
  cargos = ["Bombero", "Policía"];
  errorMessage = "";

  constructor(
    private auth: AuthService,
    private userService: UsersService,
    private router: Router
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/home");
    }
  }

  typeSelected = () => {
    this.employee.position = null;
  }

  login(form: NgForm) {
    console.log(form)
    console.log(this.employee);
    if (form.invalid) {
      console.log("Completar todos los campos");
      return;
    }

    this.auth.login(this.employee).subscribe(
      employee => {
        console.log(employee);
        this.userService.getEmployee(this.employee.email).subscribe(resp => {
          console.log(resp);
          if (resp.length === 0 && this.employee.type === 'Administrador') {
            this.auth.guardarToken(employee['idToken']);
            this.userService.crearCuentas = true;
            this.router.navigateByUrl("/home");
          } else {
            this.errorMessage = "Tipo de usuario incorrecto";
            setTimeout(() => {
              this.errorMessage = "";
            }, 5000);
          }
          if (resp.length === 1 && resp[0]["position"] === this.employee.position) {
            this.auth.guardarToken(employee['idToken']);
            localStorage.setItem("cargo", this.employee.position);
            this.router.navigateByUrl("/home");
          } else {
            this.errorMessage = "Cargo incorrecto";
            setTimeout(() => {
              this.errorMessage = "";
            }, 5000);
          }
        });
      },
      err => {
        const error = err.error.error.message;
        if (error === "EMAIL_NOT_FOUND" || error === "INVALID_PASSWORD") {
          this.errorMessage = "Correo o contraseña incorrectos";
        }
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    );
  }
}
