import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';
import { EcommerceService } from '../services/ecommerce.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  orderUpdateForm: FormGroup;
  private roles: string[];
  order : Order[];
  isLoggedIn: boolean;
  currentUser: any;
  isAdmin: boolean;
  changeTrack: boolean;
  username: string;

  constructor(
    private service: EcommerceService,
    private token: TokenStorageService,
    private router: Router,
    private fb: FormBuilder,
    private menu: MenuController
  ) { 
    this.orderUpdateForm = this.fb.group({
      status: ['']
    })
  }

  ngOnInit() {
    
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.currentUser = this.token.getUser();

      if(this.roles.includes('ROLE_ADMIN')) {
        this.isAdmin= true;
      }else{
        this.isAdmin=false;
        this.router.navigateByUrl("home");
      }

      this.username = user.username;
    }
    this.getAllOrders();
    }

    getAllOrders(){
      console.log("getAllPlanes");
      this.service.getOrders().subscribe( order => {
        console.log("inside");
        this.order = order;
      });
    }
    
    editTrack(){
      this.changeTrack = true;
    }

    deleteTrack(id:number){
      this.service.deleteTrack(id).subscribe(() => {
        window.location.reload();
      })
    }


    onFormSubmit(id: number){
      this.service.setCurrentOrderId(id);
      id = this.service.getCurrentOrderId();
      console.log(id);
      
      if(!this.orderUpdateForm.valid){
        return false;
      }else{
        let order = {
          id: id,
          total: this.orderUpdateForm.value.total,
          status: this.orderUpdateForm.value.status,
          id_user: this.orderUpdateForm.value.id_user
        }
        this.service.updateOrder(id, order)
        .subscribe((res)=>{
          window.location.reload();
        })
      }
    }



    toggleMenu() {
      this.isLoggedIn = !!this.token.getToken();
  
      if (this.isLoggedIn) {
        const user = this.token.getUser();
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

  

