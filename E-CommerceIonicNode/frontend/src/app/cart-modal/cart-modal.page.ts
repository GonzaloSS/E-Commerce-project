import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Products } from '../models/product';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: Products[] = [];

  constructor(private cartService: CartService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
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

  async checkout() {
   
    const cartCount =  this.cart.length;
    console.log('cart item count: ' + cartCount);

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
