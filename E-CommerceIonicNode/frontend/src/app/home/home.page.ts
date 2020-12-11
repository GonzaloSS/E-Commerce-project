import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  constructor(private router: Router, private renderer: Renderer2, private authService: AuthService) {}
 
  
    loginOrLogOut(){
      this.authService.isLoggedIn().then(loggedIn => {
        if(loggedIn){
         console.log("Sesión iniciada");
         
          
        } else{
        console.log("Sin sesión");
        }
        
      })
    }
    logOut(){
      this.authService.logout().then(() => {
        this.router.navigateByUrl("/home");
      });
    }
  
    
  

  goToContactPage(){
    this.router.navigateByUrl("contact-page");
  }

  goToCatalogue(){
    this.router.navigateByUrl("cart");
  }
  goToLogin(){
    this.router.navigateByUrl("login");
  }

  

  
}
