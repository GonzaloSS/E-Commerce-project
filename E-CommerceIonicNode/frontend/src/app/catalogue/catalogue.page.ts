import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Products } from '../models/product';
import { EcommerceService } from '../services/ecommerce.service';
import {ModalController} from '@ionic/angular';
import { ModalpopupPage } from '../modal/modalpopup/modalpopup.page';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {

  product: Products[];



  constructor(private productService: EcommerceService, private authService: AuthService,
    private modalController:ModalController) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    console.log("getAllPlanes");
    this.productService.getProducts().subscribe( product => {
      console.log("inside");
      this.product = product;
      console.log(product);
    });
  }

  loginOrNot(){
    this.authService.isLoggedIn().then(loggedIn => {
      if(loggedIn){
       console.log("Añadir producto");
       
        
      } else{
     
        this.modalController.create({component:ModalpopupPage}).then((modalElement) => {
          modalElement.present();
        })
      
      }
      
    })
  }
  
}
