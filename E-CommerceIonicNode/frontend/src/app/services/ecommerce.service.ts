import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Products } from '../models/product';
import { Address } from '../models/address';
import { User } from '../models/user';
import { Order } from '../models/order';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
    
  })
};
const apiUrlProducts = "http://localhost:8080/api/product"
const apiAddress = "http://localhost:8080/api/address"
const apiOrder = "http://localhost:8080/api/order"


const AUTH_API = 'http://localhost:8080/api/auth/';


@Injectable({
  providedIn: 'root'
})


export class EcommerceService {

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  currentProductId: number;
  currentOrderId: number;


  constructor(private httpClient: HttpClient) { }



  getProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(apiUrlProducts)
      .pipe(
        tap(products => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(apiOrder)
      .pipe(
        tap(order => console.log('fetched order')),
        catchError(this.handleError('getplanes', []))
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

  deleteTrack(id: number): Observable<any>{
    return this.httpClient.delete(apiOrder + "/" + id)
  }


  updateUser(id: number, user: User): Observable<any> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("username", user.username);
    bodyEncoded.append("email", user.email);
    bodyEncoded.append("password", user.password);
    bodyEncoded.append("name", user.name);
    bodyEncoded.append("lastName", user.lastName);
    
    let body = bodyEncoded.toString();

    return this.httpClient.put(AUTH_API + id, body, httpOptions)

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

  setCurrentOrderId(id: number) {
    this.currentOrderId = id;
  }

  getCurrentOrderId(): number {
    return this.currentOrderId;
  }

  getOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(apiOrder + "/" + id);
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

  updateOrder(id: number, order: Order): Observable<any> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("status", order.status);
    let body = bodyEncoded.toString();

    return this.httpClient.put(apiOrder + "/" + id, body, httpOptions)

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