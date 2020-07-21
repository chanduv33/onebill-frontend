import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { HeadlerComponent } from './header/header.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CustomerFilterPipe } from './customer-filter.pipe';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    ViewCustomersComponent,
    HeadlerComponent,
    UpdateCustomerComponent,
    CustomerFilterPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'createCustomer' , component: CustomerFormComponent},
      { path: 'viewCustomers' , component: ViewCustomersComponent},
      { path: 'update', component: UpdateCustomerComponent},
      { path: '', component: HomeComponent}
    ]),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
