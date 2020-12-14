import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Products } from '../models/product';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Order } from '../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EcommerceService } from '../services/ecommerce.service';

const ORDER_API = 'http://localhost:8080/api/order';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
    
  })
};

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: Products[] = [];
   private roles: string[];
  currentUser: any;
  isLoggedIn: boolean;

  constructor(
    private cartService: CartService, 
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController,
    private authService: AuthService,
    private token: TokenStorageService,
    private router: Router,
    private http: HttpClient,
    private service: EcommerceService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.cart = this.cartService.getCart();
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
    }
  }
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + parseInt(j.price) * j.amount, 0);
  }


  close() {
    this.modalCtrl.dismiss();
  }

  async checkout(id: number) {
    
    const cartCount =  this.cart.length;
    const total = this.getTotal();
    this.authService.setCurrentUserId(id);
    id = this.authService.getCurrentUserId();
    let status = "En proceso";

    let order: Order = {
      id: null,
      total: total,
      status: status,
      id_user: id,
      
    };
    this.authService.addOrder(order).subscribe(()=>{
      this.router.navigateByUrl("cart");
    })
    
    this.cartService.clearCart();

    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Thanks for your Order!',
      message: 'We will deliver your order as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }

}

  