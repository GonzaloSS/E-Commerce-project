import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private token: TokenStorageService,

    private router: Router
  ) { }

  ngOnInit() {
    this.token.signOut();
    
    window.location.reload()

    this.router.navigateByUrl("home");
    
  }


}
