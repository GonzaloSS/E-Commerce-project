import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Products } from '../models/product';
import { Address } from '../models/address';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
    
  })
};
const apiUrlProducts = "http://localhost:8080/api/product"
const apiAddress = "http://localhost:8080/api/address"


@Injectable({
  providedIn: 'root'
})


export class EcommerceService {

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  currentProductId: number;

  constructor(private httpClient: HttpClient) { }



  getProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(apiUrlProducts)
      .pipe(
        tap(products => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  addProduct(product: Products): Observable<any> {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", product.name);
    bodyEncoded.append("description", product.description);
    bodyEncoded.append("price", product.price);
    bodyEncoded.append("taxRate", product.taxRate);
    bodyEncoded.append("image", product.image);
    bodyEncoded.append("category", product.category);
    bodyEncoded.append("availability", product.availability);
    let body = bodyEncoded.toString();

    return this.httpClient.post(apiUrlProducts, body, httpOptions)
  }

  deleteProduct(id: number): Observable<any>{
    return this.httpClient.delete(apiUrlProducts + "/" + id)
  }

  setCurrentProductId(id: number) {
    this.currentProductId = id;
  }

  getCurrentProductId(): number {
    return this.currentProductId;
  }

  getProductById(id: number): Observable<Products> {
    return this.httpClient.get<Products>(apiUrlProducts + "/" + id);
  }

  updateProduct(id: number, product: Products): Observable<any> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", product.name);
    bodyEncoded.append("description", product.description);
    bodyEncoded.append("price", product.price);
    bodyEncoded.append("taxRate", product.taxRate);
    bodyEncoded.append("image", product.image);
    bodyEncoded.append("category", product.category);
    bodyEncoded.append("availability", product.availability);
    let body = bodyEncoded.toString();

    return this.httpClient.put(apiUrlProducts + "/" + id, body, httpOptions)

  }





  addAddress(address: Address): Observable<any> {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("street", address.street);
    bodyEncoded.append("number", address.number);
    bodyEncoded.append("zipCode", address.zipCode);
    bodyEncoded.append("province", address.province);
    bodyEncoded.append("country", address.country);
    let body = bodyEncoded.toString();

    return this.httpClient.post(apiAddress, body, httpOptions)
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

  
}