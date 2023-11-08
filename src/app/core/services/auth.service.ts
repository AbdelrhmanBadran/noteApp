import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _HttpClient:HttpClient , private router:Router) {
    this.decode()

  }
  baseUrl:string = 'https://note-sigma-black.vercel.app/api/v1/users/';

  userdata:BehaviorSubject<any> = new BehaviorSubject(null)

  decode(){

    let incode = localStorage.getItem('uToken')

    if (incode !== null) {
      let decode = jwt_decode(incode)
      this.userdata.next(decode)
      this.router.navigate(['/home'])
    }
  }

  register(userData:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}signUp`   , userData)
  }
  login(userData:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}signIn` , userData)
  }
  logout(){
    localStorage.removeItem('uToken')
    this.userdata.next(null)
    this.router.navigate(['/login'])
  }
}
