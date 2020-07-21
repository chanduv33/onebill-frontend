import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CustomerFilterPipe } from '../customer-filter.pipe';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css'],
  providers: [CustomerFilterPipe]
})
export class ViewCustomersComponent implements OnInit {
  searchedOne;
  submitted = false;
  addressProofChanged = false;
  idProofChanged = false;
  updateForm: FormGroup;
  selectedAddressProof: File;
  selectedIdProof: File;
  fileNames: any = [];
  selectedAddressProofName;
  selectedIdProofName;
  p = 1;
  customers: any[];
  constructor(public service: CustomerServiceService, public router: Router, private filter: CustomerFilterPipe, private fb: FormBuilder) {
    this.getCustomers();
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      customerId: this.fb.control('', Validators.required),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      dateOfBirth: this.fb.control('', Validators.required),
      emails: this.fb.array([
        this.createNewEmail(),
      ]),
      addresses: this.fb.array([
        this.createNewAddress(),
      ]),
      phoneNumbers: this.fb.array([
        this.createNewPhnNum(),
      ]),
      // documents: this.fb.group({
      //   addressProof: this.fb.control(''),
      //   identityProof: this.fb.control(''),
      // }),
    });
  }

  public getCustomers() {
    this.customers = this.service.getAllCustomers().subscribe(resp => {
      const response = resp;
      this.customers = response.customers;
      console.log(this.customers);
    }, err => {
      console.log(err);
    });
    console.log(this.customers);
  }

  searchCustomer(search) {
    console.log(search.value);
    this.searchedOne = this.filter.transform(this.customers, search.value);
    console.log(this.searchedOne);
    search.reset();
  }

  deleteCustomer(customerId: number) {
    // this.customers.splice(index, 1);
    console.log(customerId);
    this.service.deleteCustomerMethod(customerId).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  updateCustomer(customer) {
    this.submitted = false;
    this.service.selectedCustomer = customer;
    console.log(this.service.selectedCustomer);
  }

  closeTable() {
    this.searchedOne = null;
  }

  get emails() {
    return this.updateForm.get('emails') as FormArray;
  }

  createNewEmail() {
    return this.fb.group(
      {
        emailId: this.fb.control(''),
        email: this.fb.control(''),
      }
    );
  }

  addNewEmail() {
    this.emails.push(this.createNewEmail());
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  get addresses() {
    return this.updateForm.get('addresses') as FormArray;
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  createNewAddress() {
    return this.fb.group(
      {
        addressId: this.fb.control(''),
        line1: this.fb.control(''),
        line2: this.fb.control(''),
        state: this.fb.control(''),
        city: this.fb.control(''),
        country: this.fb.control(''),
        pincode: this.fb.control(''),
      }
    );
  }

  addNewAddress() {
    this.addresses.push(this.createNewAddress());
  }

  get phoneNumbers() {
    return this.updateForm.get('phoneNumbers') as FormArray;
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  createNewPhnNum() {
    return this.fb.group(
      {
        mobileId: this.fb.control(''),
        mobileNumber: this.fb.control(''),
      }
    );
  }

  addNewPhnNum() {
    this.phoneNumbers.push(this.createNewPhnNum());
  }

  get firstName(): FormControl {
    return this.updateForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.updateForm.get('lastName') as FormControl;
  }

  get dateOfBirth(): FormControl {
    return this.updateForm.get('dateOfBirth') as FormControl;
  }

  get documents(): FormGroup {
    // return this.form.get('documents') as FormGroup;
    const documents = this.fb.group({
      addressProof: this.fb.control(''),
      identityProof: this.fb.control(''),
    });
    return documents as FormGroup;

  }

  get notes(): FormControl {
    return this.updateForm.get('notes') as FormControl;
  }

  get clientLogo() {
    return this.updateForm.get('clientLogo') as FormControl;
  }

  setSubmitted() {
    this.submitted = false;
    console.log(this.submitted);
  }

  updateCustomerDetails() {
    console.log(this.updateForm.value);
    console.log(this.documents.value);
    const formData = new FormData();
    formData.append('customer', JSON.stringify(this.updateForm.value));
    if (this.selectedAddressProof) {
      formData.append('files', this.selectedAddressProof);
      this.fileNames.push('addressProof');
    }
    if (this.selectedIdProof) {
      formData.append('files', this.selectedIdProof);
      this.fileNames.push('idProof');
    }
    formData.append('fileNames', this.fileNames);
    this.service.updateCustomerDetails(formData).subscribe(resp => {
      console.log(resp);
      this.submitted = true;
    }, err => {
      console.log(err);
    });
  }

  selectAddressProof(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      console.log(event.target.files[0].name);
      this.selectedAddressProof = event.target.files[0];
      this.selectedAddressProofName = event.target.files[0].name;
      this.service.selectedCustomer.documents.addressProofFileName = this.selectedAddressProofName;
      console.log(this.selectedAddressProof, this.selectedAddressProofName);
      this.addressProofChanged = true;
      // document.getElementById('displayImage').style.backgroundImage = `url('../../assets/${event.target.files[0].name}')`;
    }
  }

  selectIdProof(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      console.log(event.target.files[0].name);
      this.selectedIdProof = event.target.files[0];
      this.selectedIdProofName = event.target.files[0].name;
      this.service.selectedCustomer.documents.identityProofFileName = this.selectedIdProofName;
      console.log(this.selectedIdProof, this.selectedIdProofName);
      this.idProofChanged = true;
      // document.getElementById('displayImage').style.backgroundImage = `url('../../assets/${event.target.files[0].name}')`;
    }
  }

}
