import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { UsersService } from './users/users.service';

import { UserGuard } from './users/user.guard';
import { TokenInterceptorService } from './users/token-interceptor.service';
import { HomeComponent } from './home/home/home.component';
import { CartComponent } from './cart/cart/cart.component';

import { FilterComponent } from './filter/filter.component';
//import { ProductComponent } from './products/product/product.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './products/product/product.component';
import { StoreComponent } from './products/store/store.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { CovidCareComponent } from './covid-care/covid-care.component';
import { OrderComponent } from './orders/order/order.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
//import { StoreComponent } from './products/store/store.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,

    HomeComponent,
    CartComponent,

    FilterComponent,
    // ProductComponent,
    FooterComponent,
    ProductComponent,
    StoreComponent,
    ProductCardComponent,
    CovidCareComponent,
    OrderComponent,
    AdminHomeComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    AdminDashboardComponent,
    // StoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgImageSliderModule,
    ModalModule.forRoot(),
    
  ],
  providers: [
    UsersService,
    UserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true, //so that we can use muliple interceptor if required
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
