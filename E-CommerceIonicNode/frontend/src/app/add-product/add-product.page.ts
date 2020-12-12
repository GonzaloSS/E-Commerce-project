import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../models/product';
import { EcommerceService } from '../services/ecommerce.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  constructor(
    private ecommerce: EcommerceService,
    private router: Router) { }

  ngOnInit() {
  }


  addProduct(form){
    console.log("hola");
    
    let product: Products = {
      id: null,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      taxRate: form.value.taxRate,
      image: form.value.image,
      category: form.value.category,
      availability: form.value.availability,
      amount: null
      
    };
    this.ecommerce.addProduct(product).subscribe(()=>{
      this.router.navigateByUrl("cart");
    })
}
}
