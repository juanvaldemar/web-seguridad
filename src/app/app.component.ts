import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seguridadCiudadanaWeb';
  showNav = false;
  constructor(private auth: AuthService, private userService: UsersService, private router: Router) { }

  ngOnInit() {
  }


  salir() {
    this.userService.crearCuentas = false;
    this.auth.logout();
    this.router.navigateByUrl('/login');

  }
}
