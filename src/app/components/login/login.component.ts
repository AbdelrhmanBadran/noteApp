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
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
    })
  }


  login(){

    if (this.loginForm.valid) {
      this._AuthService.login(this.loginForm.value).subscribe({
        next:res=>{
          console.log(res);
          localStorage.setItem('uToken',  res.token)
          this.loading = false
          this._AuthService.decode()
          this._toastr.success(res.msg, 'Login Successfully');
        },
        error:err=>{
          console.log(err);
          this._toastr.error(err.error.msg , 'error');
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
