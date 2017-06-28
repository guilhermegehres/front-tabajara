import { Component, OnInit } from '@angular/core';
import { UtilService } from "./../service/util.service";
import { UserService } from "./../service/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-user',
  templateUrl: './novo-user.component.html',
  styleUrls: ['./novo-user.component.css']
})
export class NovoUserComponent implements OnInit {

  private erro : string = null;
  private requisitando : boolean = false;
  private nome : string;
  private email : string;
  private senha : string;
  private cpf : string;
  private isLogged : boolean = false;
  private isEdit : boolean = false;
  private user : any;
  private type : any = 2;

  constructor(private util : UtilService,
              private uService : UserService,
              private router : Router
  ) { }

  ngOnInit() {
    this.isLogged = this.util.isLogged();
    if(this.util.userToEdit != null && this.util.userToEdit != undefined && this.util.userToEdit != ""){
      this.setUserData(this.util.userToEdit);
      this.isEdit = true;
      console.log(this.util.userToEdit);
      this.type = this.util.userToEdit.tipo;
    }
  }

  setUserData(user : any){
    this.nome = user.nome;
    this.email = user.email;
    this.cpf = user.cpf;
    this.senha = user.senha;
  }

  saveUser() : any{
    if(this.validaCampos()){
      this.requisitando = true;
      this.user = {
        "nome": this.nome,
        "email": this.email,
        "senha": this.senha,
        "token": null,
        "tipo": 2,
        "alugueis": null,
        "reservas": null,
        "cpf": this.cpf
      };
      if(!this.isEdit){
        this.uService.createUser(this.user)
        .then((response) => {
          this.erro = null;
          this.requisitando = false;
          if(response.success == false){
            this.erro = response.err;
          }else{
            this.uService.login(response.email, response.senha);
          }
        })
        .catch((response) => {
          this.erro = "ops! Houve um erro, tente novamente!";
          this.requisitando = false;
        });
      }else{
        this.uService.updateUser(this.user,this.util.userToEdit.id)
        .then((response) => {
          this.router.navigateByUrl("usuarios");
        })
        .catch((response) => {
          this.erro = "ops! Houve um erro, tente novamente!";
          this.requisitando = false;
        });
      }
    }
  }

  validaCampos() : boolean{
    this.erro = null;
    let msg = "";
    let valido = true;
    if(this.cpf == null || this.cpf == undefined || this.cpf == "" || !this.util.validaCpf(String(this.cpf))){
      msg = msg + "Campo cpf inválido!"
      valido = false;
    }
    if(this.email == null || this.email == undefined || this.email == "" || !this.util.validaEmail(this.email)){
      msg = msg + "Campo email inválido!"
      valido = false;
    }
    if(this.senha == null || this.senha == undefined || this.senha == ""){
      msg = msg + "Campo senha inválido!"
      valido = false;
    }
    if(this.nome == null || this.nome == undefined || this.nome == ""){
      msg = msg + "Campo nome inválido!"
      valido = false;
    }
    this.erro = msg;
    return valido;
  }


}
