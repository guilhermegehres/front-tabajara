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
  getUsers() : any{
    return this.http.get("/user")
    .then();
  }
  deleteUser(id : number) : any{
    return this.http.delete("/user", id).then();
  }
  getUsersSeacrh(search : string) : any{
    let params : URLSearchParams = new URLSearchParams();
    params.append('search', search);
    return this.http.get("/user/search/", params)
    .then();
  }

  updateUser(user, id) : any{
    return this.http.put('/user', user, id).then();
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