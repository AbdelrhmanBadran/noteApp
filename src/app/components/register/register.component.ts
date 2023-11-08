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

    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(14)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
    age:new FormControl(null,[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
    })
  }


  register(){

    if (this.registerForm.valid) {
      this.loading = true
      this._AuthService.register(this.registerForm.value).subscribe({
        next: res=>{
          console.log(res);
          this._Router.navigate(['/login'])
          this.loading = false
          this._toastr.success(res.msg , 'Register Successfully');
        },
        error:err=>{
          console.log(err);
          this.loading = false
          this.errMsg = err.error.msg
          this._toastr.error(err.error.msg , 'error');
        }
      })
    }

  }
}
