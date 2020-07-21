import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomerServiceService } from '../customer-service.service';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  error: any;
  errors: any = [] = new Array();
  form: FormGroup;
  fileNames: any = [];
  submitted = false;
  selectedAddressProof: File;
  selectedIdProof: File;
  selectedAddressProofName;
  selectedIdProofName;
  constructor(private fb: FormBuilder, private service: CustomerServiceService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.form = this.fb.group({
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

  get emails() {
    return this.form.get('emails') as FormArray;
  }

  createNewEmail() {
    return this.fb.group(
      {
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
    return this.form.get('addresses') as FormArray;
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  createNewAddress() {
    return this.fb.group(
      {
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
    return this.form.get('phoneNumbers') as FormArray;
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  createNewPhnNum() {
    return this.fb.group(
      {
        mobileNumber: this.fb.control(''),
      }
    );
  }

  addNewPhnNum() {
    this.phoneNumbers.push(this.createNewPhnNum());
  }

  get firstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get dateOfBirth(): FormControl {
    return this.form.get('dateOfBirth') as FormControl;
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
    return this.form.get('notes') as FormControl;
  }

  get clientLogo() {
    return this.form.get('clientLogo') as FormControl;
  }

  createCustomer() {
    this.error = null;
    this.errors = [];
    console.log(this.form.value);
    console.log(this.documents.value);
    const formData = new FormData();
    formData.append('customer', JSON.stringify(this.form.value));
    if (this.selectedAddressProof) {
      formData.append('files', this.selectedAddressProof);
      this.fileNames.push('addressProof');
    }
    if (this.selectedIdProof) {
      formData.append('files', this.selectedIdProof);
      this.fileNames.push('idProof');
    }
    formData.append('fileNames', this.fileNames);
    this.service.postCustomerDetails(formData).subscribe(resp => {
      console.log(resp);
      this.submitted = true;
    }, err => {
      console.log(err);
      if (err.error.errors) {
        this.errors = err.error.errors;
        console.log(this.errors);
      }
      this.error = err.error;
      console.log(this.error);
    });
  }

  selectAddressProof(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      console.log(event.target.files[0].name);
      this.selectedAddressProof = event.target.files[0];
      this.selectedAddressProofName = event.target.files[0].name;
      console.log(this.selectedAddressProof, this.selectedAddressProofName);
      // document.getElementById('displayImage').style.backgroundImage = `url('../../assets/${event.target.files[0].name}')`;
    }
  }

  selectIdProof(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      console.log(event.target.files[0].name);
      this.selectedIdProof = event.target.files[0];
      this.selectedIdProofName = event.target.files[0].name;
      console.log(this.selectedIdProof, this.selectedIdProofName);
      // document.getElementById('displayImage').style.backgroundImage = `url('../../assets/${event.target.files[0].name}')`;
    }
  }



}
