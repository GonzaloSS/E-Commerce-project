import { Component, OnInit } from '@angular/core';
import { Products } from '../models/product';
import { EcommerceService } from '../services/ecommerce.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {

  product: Products[];



  constructor(private productService: EcommerceService) { }

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
  
}
