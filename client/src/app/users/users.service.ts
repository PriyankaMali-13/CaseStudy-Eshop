//we create Angular Service for consuming REST API using Angular HttpClient
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/*angular router is use to present a particular 
component view - refer logoutUser() present at the last*/
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //endpoint api for register
  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  private _getUsers = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private _router: Router) {}

  /*the registerUser accepct the user object which is email and password & returns
  the response that the backend api sends whenever it is available*/
  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  getAllUsers() {
    return this.http.get(this._getUsers);
  }

  /*the loginUser accepct the user object which is email and password & returns
  the response that the backend api sends whenever it is available*/
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  /*this method is used to chk whether user is valid or not -- used in the user.gaurd.ts(route gaurd)*/
  loggedIn() {
    return !!localStorage.getItem('token'); //!! is used bcoz it will return boolean value whether token exits in browser or not
  }

  //logout the user when user clicks on logout button
  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/']); //we have used router to present home component after the user is loggedout
  }

  /*method that fetches the token value*/
  getToken() {
    return localStorage.getItem('token');
  }
}
