import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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

  private roles: string[];
  isLoggedIn = false;
  username: string;


  constructor(
    private token: TokenStorageService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private menu: MenuController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    
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

  addAddress(){
    this.router.navigateByUrl("add-address")
  }

  toggleMenu() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
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
