import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuName:string = 'login'

  constructor(private router:Router , private AuthService:AuthService){
    this.router.events.subscribe({
      next:res=>{
        if (res instanceof NavigationEnd) {
          this.menuName = res.url.slice(1)
        }
      }
    })
  }

  


}
