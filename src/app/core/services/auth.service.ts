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
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signup' , userData)
  }
  login(userData:any):Observable<any>
  {
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signin' , userData)
  }
  logout(){
    localStorage.removeItem('uToken')
    this.userdata.next(null)
    this.router.navigate(['/login'])
  }
}
