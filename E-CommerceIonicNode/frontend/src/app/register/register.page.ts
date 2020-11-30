import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
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
  user: User[];
  
  constructor(private router: Router, private authService: AuthService, private ecommerceService: EcommerceService) {}

  ngOnInit(){

  }

register(form){
  let address: Address = {
    id: null,
    street: form.value.street,
    number: form.value.number,
    zipCode: form.value.zipCode,
    province: form.value.province,
    country: form.value.country
    
  };
  let user: User = {
    id: null,
    name: form.value.name,
    lastName: form.value.name,
    email: form.value.name,
    password: form.value.name,
    username: form.value.name,
    isAdmin: false,
    //id_address: 1

  };
  this.ecommerceService.addAddress(address).subscribe((res) => {
    console.log(user);
    
    this.authService.register(user).subscribe((res) => {
      this.router.navigateByUrl('home')
    })
  })
 
  
  
}










  /*constructor(public fb: FormBuilder,
    private ecommerceService: EcommerceService,
    private router: Router,) {
      this.registerForm = this.fb.group({
        name: [''],
        username: [''],
        password: [''],
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
*/
  



}
