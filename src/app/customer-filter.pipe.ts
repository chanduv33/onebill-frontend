import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: any[], data: any) {
    let searchedCustomer;
    value.filter(customer => {
      if (customer.firstName === data.firstName && customer.dateOfBirth === data.dateOfBirth ){
        searchedCustomer = customer;
      }
    });
    return searchedCustomer;
  }

}
