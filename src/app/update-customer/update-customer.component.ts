import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  updateForm: FormGroup;
  selectedAddressProof: File;
  selectedIdProof: File;
  selectedAddressProofName;
  selectedIdProofName;
  constructor(private fb: FormBuilder, public service: CustomerServiceService) { }

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

  get emails() {
    return this.updateForm.get('emails') as FormArray;
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

  removeEmail(index: number){
    this.emails.removeAt(index);
  }

  get addresses() {
    return this.updateForm.get('addresses') as FormArray;
  }

  removeAddress(index: number){
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
    return this.updateForm.get('phoneNumbers') as FormArray;
  }

  removePhoneNumber(index: number){
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

  updateCustomer() {
    console.log(this.updateForm.value);
    console.log(this.documents.value);
    const formData = new FormData();
    formData.append('customer', JSON.stringify(this.updateForm.value));
    formData.append('document', this.selectedAddressProof);
    formData.append('document', this.selectedIdProof);
    this.service.updateCustomerDetails(formData);
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
