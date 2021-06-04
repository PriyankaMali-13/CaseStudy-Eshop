import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  userData : any;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getAllUsers().subscribe((result) => {
      console.log(result);
      this.userData = result;
    });
  }
}
