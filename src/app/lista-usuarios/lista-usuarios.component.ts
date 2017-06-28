import { Component, OnInit } from '@angular/core';
import { UserService } from "./../service/user.service";
import { UtilService } from "./../service/util.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  private users : any[];
  private requisitando : boolean = false;
  private msgSucesso : string = null;
  private msgErro : string = null;
  private busca : string;
  private isAdmin : boolean = false;

  constructor(
    private uService : UserService,
    private util : UtilService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.uService.getUsers()
    .then((response) => {this.users = response})
    .catch();
  }

  editUser(entry : any){
    this.util.userToEdit = entry;
    this.router.navigateByUrl("newUser");
  }

  search(event){
    this.requisitando = true;
    this.uService.getUsersSeacrh(this.busca)
    .then((response) => {
      console.log(response);
      this.users = response;
      this.requisitando = false;
    })
    .catch(() => {
      this.requisitando = false;
      this.mostraErro("Ops, houve um erro durante sua busca, tente novamente ou entre em contato!");
    });
  }

  mostraSucesso(msg : string){
    this.msgSucesso = msg;
    setTimeout(() => this.msgSucesso = null , 3000);
  }
  mostraErro(msg : string){
    this.msgErro = msg;
    setTimeout(() => this.msgErro = null , 3000);
  }

}
