import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EcommerceService } from '../services/ecommerce.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn: boolean;
  private roles: string[];
  username: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private menu: MenuController,
    private service: EcommerceService) { }

  ngOnInit() {
    
    
    
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

  onSubmit() {
    let id= this.service.getCurrentAddressId();
    this.authService.register(this.form, id).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl("home");
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

 

  
}
