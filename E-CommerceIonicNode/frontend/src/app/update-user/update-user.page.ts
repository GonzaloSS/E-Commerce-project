import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EcommerceService } from '../services/ecommerce.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  userUpdateForm: FormGroup;
  currentUser: any;
  form: any = {};
  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';
  isLoggedIn: boolean;
  private roles: string[];
  username: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private menu: MenuController,
    private service: EcommerceService,
    private fb: FormBuilder) {

      this.userUpdateForm = this.fb.group({
        username: [''],
        email: [''],
        name: [''],
        lastName: ['']
     })
    }

  ngOnInit() {
    let id = this.authService.getCurrentUserId();
    this.currentUser = this.tokenStorageService.getUser();

    this.authService.getUserById(id).subscribe((u) => {
      this.userUpdateForm = this.fb.group({
        username: u.username,
        email: u.email,
        name: u.name,
        lastName: u.lastName
      })
    })
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

  onFormSubmit(){
    let id = this.authService.getCurrentUserId();
    if(!this.userUpdateForm.valid){
      return false;
    }else{
      let user = {
        id: id,
        username: this.userUpdateForm.value.username,
        email: this.userUpdateForm.value.email,
        name: this.userUpdateForm.value.name,
        lastName: this.userUpdateForm.value.lastName,
        password: null,
        id_address: null,
        
      }
      this.service.updateUser(id, user)
      .subscribe((res)=>{
        this.router.navigateByUrl("profile");
      
        
      })
    }
  }
 

}
