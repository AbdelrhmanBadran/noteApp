import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  loading:boolean = false
  constructor(private _AuthService:AuthService ,private _Router:Router , private _toastr:ToastrService){ }
  errMsg:string = ''

  ngOnInit(): void {
    this.ceateForm()
  }

  registerForm!:FormGroup


  ceateForm(){
  this.registerForm = new FormGroup({
      first_name: new FormControl(null , [Validators.required , Validators.pattern(/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/)]),
      last_name: new FormControl(null , [Validators.required , Validators.pattern(/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/)]),
      email: new FormControl(null , [Validators.required , Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
      password: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      age: new FormControl(null , [Validators.required , Validators.pattern(/^([1-7][0-9]|80)$/)]),
    })
  }


  register(){

    if (this.registerForm.valid) {
      this.loading = true
      this._AuthService.register(this.registerForm.value).subscribe({
        next: res=>{
          console.log(res);
          if (res.message == 'success') {
            this._Router.navigate(['/login'])
            this.loading = false
            this._toastr.success(res.message , 'Register Successfully');

          }else{
            this.loading = false
            this.errMsg = res.errors.email.message
            this._toastr.error(res.errors.email.message , 'error');

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
