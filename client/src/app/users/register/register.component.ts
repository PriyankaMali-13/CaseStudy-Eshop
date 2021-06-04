import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //declaring the empty object to bind the input of form to this empty object
  registerUserData: any = {};

  constructor(private _users: UsersService, private _router: Router) {}

  ngOnInit(): void {}

  //method which is called when user clicks on regsiter button
  registerUser() {
    this._users.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res),
          //setting an item with token which has given by the browser into local stroage
          localStorage.setItem('token', res.token),
          this._router.navigate(['/products']);
      },
      (err) => console.log(err)
    );
  }
}
