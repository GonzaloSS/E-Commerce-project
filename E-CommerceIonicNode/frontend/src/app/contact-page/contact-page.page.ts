import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.page.html',
  styleUrls: ['./contact-page.page.scss'],
})
export class ContactPagePage implements OnInit {
  dark = false;
  private roles: string[];
  isLoggedIn = false;
  username: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private menu: MenuController) { 
    const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
    this.dark = prefersColor.matches;
    this.updateDarkMode();

    prefersColor.addEventListener(
      'change',
      mediaQuery => {
        this.dark = mediaQuery.matches;
        this.updateDarkMode();
      }
    );
  }

  ngOnInit() {
  }

  toggleTheme(event){
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark')
    }else{
      document.body.setAttribute('color-theme', 'lightS')
    }
  }

  updateDarkMode() {
    document.body.classList.toggle('dark', this.dark);
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
