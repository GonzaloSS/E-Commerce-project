import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload()
  }

  goToContactPage() {
    this.router.navigateByUrl("contact-page");
  }

  goToCatalogue() {
    this.router.navigateByUrl("cart");
  }
  goToLogin() {
    this.router.navigateByUrl("login");
  }




}
