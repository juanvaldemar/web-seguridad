import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios =[];
  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(res => {
      this.usuarios = res;
      console.log(res)
    });
  }

}
