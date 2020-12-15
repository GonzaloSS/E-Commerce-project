import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Address } from '../models/address';
import { AuthService } from '../services/auth.service';
import { EcommerceService } from '../services/ecommerce.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: any;
  currentAddress: any;

  private roles: string[];
  isLoggedIn = false;
  isAddress : boolean;
  username: string;


  constructor(
    private token: TokenStorageService,
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,
    private service: EcommerceService,
    private httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    
   
   
  }


  getAddress(id: number){
    this.service.setCurrentAddressId(id);
    this.service.getAddressById().subscribe( address => {
      this.currentAddress = address;
      this.isAddress= true;
      console.log(this.currentAddress);
      
    });
  }


  logout() {
    this.token.signOut();
    window.location.reload()
    this.goToHome();
  }

  updateInfo(id: number){
    this.authService.setCurrentUserId(id);
    console.log(id);
    
    this.router.navigateByUrl("update-user");
  }
  
  goToHome(){
    this.router.navigateByUrl("home");
  }

  

  toggleMenu() {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      if (this.roles.includes('ROLE_USER')) {
        this.menu.enable(true, 'user');
        this.menu.open('user');

      }
      if(this.roles.includes('ROLE_ADMIN')) {
        this.menu.enable(true, 'admin');
        this.menu.open('admin');
      }

      this.username = user.username;
    } else {
      this.menu.enable(true, 'guest');
      this.menu.open('guest');
    }

  }

}
