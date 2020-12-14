import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from '../services/ecommerce.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {

  productUpdateForm: FormGroup;

  constructor(
    private service: EcommerceService,
    public fb: FormBuilder,
    private router: Router

  ) {
    this.productUpdateForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      taxRate: [''],
      image: [''],
      category: [''],
      availability: ['']
    })
  }

  ngOnInit() {
    let id = this.service.getCurrentProductId();
    console.log(id);
    

    this.service.getProductById(id).subscribe((p) => {
      this.productUpdateForm = this.fb.group({
        name: p.name,
        description: p.description,
        price: p.price,
        taxRate: p.taxRate,
        image: p.image,
        category: p.category,
        availability: p.availability
      })
    })
  }

  onFormSubmit(){
    let id = this.service.getCurrentProductId();
    if(!this.productUpdateForm.valid){
      return false;
    }else{
      let product = {
        id: id,
        name: this.productUpdateForm.value.name,
        description: this.productUpdateForm.value.description,
        price: this.productUpdateForm.value.price,
        taxRate: this.productUpdateForm.value.taxRate,
        image: this.productUpdateForm.value.image,
        category: this.productUpdateForm.value.category,
        availability: this.productUpdateForm.value.availability,
        amount: 1
      }
      this.service.updateProduct(id, product)
      .subscribe((res)=>{
        this.router.navigateByUrl("cart");
      })
    }
  }

}
