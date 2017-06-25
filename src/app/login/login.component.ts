import { Component, OnInit } from '@angular/core';
import { HttpHandler } from "./../http.handler";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email : string;
  private senha : string;

  constructor(private http : HttpHandler, 
              private router : Router) { }

  private erro : string = null;
  private requisitando : boolean = false;

  ngOnInit() {
  }

  private login(){
    this.erro = null;
    this.requisitando = true;
    this.http.post("/user/login",{
        "email": this.email,
        "senha": this.senha
      })
      .then((response) => {
        console.log(response);
        window.localStorage.setItem("token" , response.token);
        window.localStorage.setItem("tipo", response.tipo);
        response.token = null;
        window.localStorage.setItem("user", response);
        this.router.navigateByUrl('reserva');
      })
      .catch((http) => {
        this.erro = "Login ou senha incorretos!";
        this.requisitando = false;
      });
  }

}
