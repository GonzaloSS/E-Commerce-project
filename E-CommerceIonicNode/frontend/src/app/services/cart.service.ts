import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap, map } from 'rxjs/operators';
import { Products } from '../models/product';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};
const apiUrlProducts = "http://localhost:8080/api/product"



@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cart = [];
  public cartItemCount = new BehaviorSubject(0);
  
  constructor(
    private httpClient: HttpClient
    ) {}

  getProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(apiUrlProducts)
      .pipe(
        tap(products => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (const p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.getCartItemCount();
  }

  decreaseProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  

  removeProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - 1);
        this.cart.splice(index, 1);
      }
    }
  }

  

  clearCart() {
    this.cart.length = 0;
  }
}
