import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { User } from '../models/user';
import { EcommerceService } from '../services/ecommerce.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {


  address: Address[];
  registerForm: FormGroup;
  user: User[];
  
  constructor(public fb: FormBuilder,
    private ecommerceService: EcommerceService,
    private router: Router,) {
      this.registerForm = this.fb.group({
        street: [''],
        number: [''],
        zipCode: [''],
        province:[],
        country:['']

      })
     }

  ngOnInit() {}


  onFormSubmit() {
    if (!this.registerForm.valid) {
      console.log("no va");
      return false;
    } else {
      let address: Address = {
        id: null,
        street: this.registerForm.value.street,
        number: this.registerForm.value.number,
        zipCode: this.registerForm.value.zipCode,
        province: this.registerForm.value.province,
        country: this.registerForm.value.country
      }
      
      this.ecommerceService.addAddress(address)
        .subscribe((res) => {
          this.router.navigateByUrl("/home")
          });
        }
      
  }

  



}
