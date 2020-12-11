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
const apiUrlUserRegister = "http://localhost:8080/api/address/"


@Injectable({
  providedIn: 'root'
})


export class EcommerceService {

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) { }



  getProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(apiUrlProducts)
      .pipe(
        tap(products => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  addAddress(address: Address): Observable<any> {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("street", address.street);
    bodyEncoded.append("number", address.number);
    bodyEncoded.append("zipCode", address.zipCode);
    bodyEncoded.append("province", address.province);
    bodyEncoded.append("country", address.country);
    let body = bodyEncoded.toString();

    return this.httpClient.post(apiUrlUserRegister, body, httpOptions)
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