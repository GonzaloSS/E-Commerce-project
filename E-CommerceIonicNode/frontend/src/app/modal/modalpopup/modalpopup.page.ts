import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  constructor(private modalController:ModalController,
    private router:Router) { }

  ngOnInit() {
  }

  CloseModal(){
    this.modalController.dismiss();
  }

  goToLogin(){
    this.CloseModal();
    this.router.navigateByUrl('login');
  }
  goToRegister(){
    this.CloseModal();
    this.router.navigateByUrl('register');
  }


  
}
