import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsersService } from './users.service';

/*Just by using route gaurd to handle events is not enough user can create their own token and 
navigate to our page so we need to verify our token with backend also for that we use HTTPINTERCEPTOR*/ 

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private injector: Injector) {}
  
  //method to send token to browser which takes 2 args 1)the req 2)next to pass on the execution
  intercept(req:any, next:any) {
    //use injector to get instance of userservice
    let userService = this.injector.get(UsersService);
    let tokenizedReq = req.clone({
      setHeaders:{
        //authorization is key and bearer is value passed with the token
        Authorization: `Bearer ${userService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
