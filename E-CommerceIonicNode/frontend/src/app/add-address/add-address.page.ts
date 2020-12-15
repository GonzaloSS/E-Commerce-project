import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalpopupPage } from '../modal/modalpopup/modalpopup.page';
import { Address } from '../models/address';
import { EcommerceService } from '../services/ecommerce.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  isLoggedIn: boolean;

  address: Address[];


  constructor(
    private tokenStorageService: TokenStorageService,
    private modalCtrl: ModalController,
    private ecommerceService: EcommerceService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  
      if (this.isLoggedIn) {
        this.router.navigateByUrl("home");
      }else{
        
      }
      }

      addAddress(form){
        let address: Address = {
          id: null,
          street: form.value.street,
          number: form.value.number,
          location: form.value.location,
          zipCode: form.value.zipCode,
          province: form.value.province,
          country: form.value.country
          
        };
        this.ecommerceService.addAddress(address).subscribe((res) => {
          this.router.navigateByUrl("addresses");
        })
  }
}



