import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router : Router){}
  canActivate() {
      let token = window.localStorage.getItem("token");
      if(token == "" || token == undefined){
        this.router.navigateByUrl("login");
      }
      return true;
  }
}
