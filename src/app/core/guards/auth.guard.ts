import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const auth:CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>{

  const auth = inject(AuthService)
  const router = inject(Router)

  if (auth.userdata.getValue() !== null) {
    return true
  }else{
    router.navigate(['/login'])
    return false
  }

}
