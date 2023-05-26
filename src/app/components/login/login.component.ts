import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;
  loading:boolean = false
  constructor(private _AuthService:AuthService ,private _Router:Router , private _toastr:ToastrService){ }
  errMsg:string = ''

  ngOnInit(): void {
    this.ceateForm()
  }

  loginForm!:FormGroup


  ceateForm(){
  this.loginForm = new FormGroup({
      email: new FormControl(null , [Validators.required , Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
      password: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    })
  }


  login(){

    if (this.loginForm.valid) {
      this._AuthService.login(this.loginForm.value).subscribe({
        next:res=>{
          console.log(res);
          if (res.message == 'success') {
            localStorage.setItem('uToken',  res.token)
            this.loading = false
            this._AuthService.decode()
            this._toastr.success(res.message, 'Login Successfully');

          }else{
            this._toastr.error(res.message , 'error');
          }

        },
        error:err=>{
          console.log(err);
          this.loading = false

        }
      })
    }

  }
}


/**
 * if (this.loginForm.valid) {
      this.loading = true
      this._AuthService.login(this.loginForm.value).subscribe({
        next: res=>{
          console.log(res);
          if (res.message == 'success') {
            localStorage.setItem('uToken' , res.token)
            // this._AuthService.decode()
            this._Router.navigate(['/home'])
            this.loading = false
            this._toastr.success(res.message, 'Login Successfully');
          }else{
            this.loading = false

            this._toastr.error(res.message , 'error');

          }
        },
        error:err=>{
          console.log(err);
          this.loading = false
        }
      })
    }
 */
