import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const AUTH_API = 'http://localhost:8080/api/auth/';
const ORDER_API = 'http://localhost:8080/api/order';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserId: number;

  constructor(
    private http: HttpClient
    ) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
      lastName: user.lastName
    }, httpOptions);
  }


  setCurrentUserId(id: number) {
    this.currentUserId = id;
  }

  getCurrentUserId(): number {
    return this.currentUserId;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(AUTH_API + id);
  }


  update(id: number ,user: User): Observable<any> {
    id = this.getCurrentUserId();
    return this.http.put("http://localhost:8080/api/auth/" + id, {

      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
      lastName: user.lastName
    }, httpOptions);
  }

  addOrder(order): Observable<any> {
    return this.http.post( ORDER_API, {
      total: order.total,
      status: order.status,
      id_user: order.id_user
    }, httpOptions);
  }
  

  
          



  }

