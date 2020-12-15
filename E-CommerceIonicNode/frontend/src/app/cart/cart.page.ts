import { CartService } from './../services/cart.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, AlertController, PopoverController, MenuController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { ModalpopupPage } from '../modal/modalpopup/modalpopup.page';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { EcommerceService } from '../services/ecommerce.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  dark = false;
  cart = [];
  products: any;
  cartItemCount: BehaviorSubject<number>;
  cartIsEmpty: boolean;

  private roles: string[];
  isLoggedIn = false;
  username: string;
  isAdmin: boolean;
  currentUser: any;


  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertDialog: AlertController,
    public popoverController: PopoverController,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private menu: MenuController,
    private service : EcommerceService
  ) {

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
      
    
    

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.currentUser = this.tokenStorageService.getUser();

      if(this.roles.includes('ROLE_ADMIN')) {
        this.isAdmin= true;
      }else{
        this.isAdmin=false;
      }

      this.username = user.username;
    }





    this.cartService.getProducts().subscribe(product => {
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


  toggleTheme(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark')
    } else {
      document.body.setAttribute('color-theme', 'lightS')
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    window.location.reload();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



  openCartCheckUser() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.openCart();
      /*this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');*/

      this.username = user.username;
    } else {
      this.modalCtrl.create(
        { component: ModalpopupPage }).then((modalElement) => {
          modalElement.present();
        })
    }
  }

  openProfileCheckUser() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.goToProfile();
      /*this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');*/

      this.username = user.username;
    } else {
      this.modalCtrl.create(
        { component: ModalpopupPage }).then((modalElement) => {
          modalElement.present();
        })
    }
  }
  addProduct(){
    this.router.navigateByUrl("add-product");
  }

  editProduct(id: number){
    this.service.setCurrentProductId(id);
    console.log(id);
    
    this.router.navigateByUrl("edit-product");
  }

  goToProfile() {
    this.router.navigateByUrl("profile");
  }

  deleteProduct(id:number){
    this.service.deleteProduct(id).subscribe(() => {
      window.location.reload();
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

}
