import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { HomeComponent } from './home/home/home.component';
import { ProductComponent } from './products/product/product.component';

import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { UserGuard } from './users/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  /*When we try to navigate to products the canActivate is ececuted
    if it return => true ==navigation is allowed 
    else not*/
  //{ path: 'product', component: ProductComponent, canActivate: [UserGuard] },
  { path: 'home', component: HomeComponent },
  //{ path: 'store', component: StoreComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
