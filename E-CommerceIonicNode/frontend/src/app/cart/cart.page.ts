import { CartService } from './../services/cart.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ModalpopupPage } from '../modal/modalpopup/modalpopup.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  dark = false;
  cart = [];
  products : any;
  cartItemCount: BehaviorSubject<number>;
  cartIsEmpty: boolean;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(private cartService: CartService,
    private modalCtrl: ModalController,
    private alertDialog: AlertController,
    public popoverController: PopoverController,
    private authService: AuthService) {

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
      this.cartService.getProducts().subscribe( product => {
        this.products = product;
       console.log(product);
     });
      this.cart = this.cartService.getCart();
      this.cartIsEmpty = true;
      this.cartItemCount = this.cartService.getCartItemCount();
    }

    updateDarkMode() {
      document.body.classList.toggle('dark', this.dark);
    }
  
    addToCart(product) {
      this.cartService.addProduct(product);
      this.animateCSS('tada');
      this.cartIsEmpty = false;
    }
  
    async openCart() {
      this.animateCSS('bounceOutLeft', true);
  
      const modal = await this.modalCtrl.create({
        component: CartModalPage,
        cssClass: 'cart-modal'
      });
      modal.onWillDismiss().then(() => {
        this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
        this.animateCSS('bounceInLeft');
      });
      modal.present();
    }
  
    async openEmptyCartAlert() {
      const alert = await this.alertDialog.create({
        mode: 'ios',
        message: 'Please add items to cart',
        buttons: ['OK']
      });
      await alert.present();
    }
  
    animateCSS(animationName, keepAnimated = false) {
      const node = this.fab.nativeElement;
      node.classList.add('animated', animationName);
  
      // https://github.com/daneden/animate.css
      function handleAnimationEnd() {
        if (!keepAnimated) {
          node.classList.remove('animated', animationName);
        }
        node.removeEventListener('animationend', handleAnimationEnd);
      }
      node.addEventListener('animationend', handleAnimationEnd);
    }

   
    toggleTheme(event){
      if(event.detail.checked){
        document.body.setAttribute('color-theme', 'dark')
      }else{
        document.body.setAttribute('color-theme', 'lightS')
      }
    }

    openCartCheckUser(){
      this.authService.isLoggedIn().then(loggedIn => {
        if(loggedIn){
        this.openCart();
         console.log();
         
          
        } else{
          this.modalCtrl.create({component: ModalpopupPage}).then((modalElement)=>{
            modalElement.present();
          })
        
        }
        
      })
    }

    
}
