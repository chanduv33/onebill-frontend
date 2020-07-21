import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  backendUrl = 'http://localhost:8080';
  selectedCustomer;
  constructor(private http: HttpClient) { }

  postCustomerDetails(formData: FormData) {
    // let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    this.http.post(`${this.backendUrl}/createCustomer`, formData).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

  getAllCustomers(): any {
    return this.http.get(`${this.backendUrl}/getCustomers`);
    // return this.http.get('../../assets/customers.json');
  }

  updateCustomerDetails(formData: FormData) {
    console.log(formData);
    return this.http.put(`${this.backendUrl}/updateCustomer`, formData);
  }

  deleteCustomerMethod(customerId: number) {
   return this.http.delete(`${this.backendUrl}/deleteCustomer/${customerId}`);
  }
}
