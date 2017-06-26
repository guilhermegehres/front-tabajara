import { Injectable } from '@angular/core';
import { HttpHandler } from './../http.handler';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';


@Injectable()
export class UserService {

  constructor(private http : HttpHandler,
              private router : Router
  ) { }

  createUser(user : any) : any {
      return this.http.post("/user", user).then();
  }

  login(email, senha){
    this.http.post("/user/login",{
        "email": email,
        "senha": senha
      })
      .then((response) => {
        console.log(response);
        window.localStorage.setItem("token" , response.token);
        window.localStorage.setItem("tipo", response.tipo);
        response.token = null;
        window.localStorage.setItem("user", JSON.stringify(response));
        this.router.navigateByUrl('reserva');
      })
      .catch((http) => {
      });
  }

}