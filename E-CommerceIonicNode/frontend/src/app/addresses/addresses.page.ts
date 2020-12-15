import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { EcommerceService } from '../services/ecommerce.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  address : Address[];
  isLoggedIn: boolean;
  roles: string[] = [];
  isAdmin: boolean;
  username: any;

  constructor(
    private service: EcommerceService,
    private router: Router,
    private token: TokenStorageService
  ) { }

  ngOnInit() {
    this.isLoggedIn = !!this.token.getToken();

    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      

      if(this.roles.includes('ROLE_ADMIN')) {
        this.isAdmin= true;
      }else{
        this.isAdmin=false;
      }

      this.username = user.username;
    }
    this.getAllAddresses();
  }
  
  getAllAddresses(){
    console.log("getAllAddresses");
    this.service.getAddress().subscribe( address => {
      console.log("inside");
      this.address = address;
    });
  }

  addAddress(){
    this.router.navigateByUrl("add-address");
  }

  deleteAddress(id: number){
    this.service.deleteAddress(id).subscribe(() => {
      window.location.reload();
    })
  }

  register(id:number){
    this.service.setCurrentAddressId(id)
    this.router.navigateByUrl("register");
    
  }
}
