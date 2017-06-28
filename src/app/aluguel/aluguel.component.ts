import { Component, OnInit } from '@angular/core';
import { AluguelService } from './../service/aluguel.service';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css']
})
export class AluguelComponent implements OnInit {

  private listaAlugueis : any[];
  private requisitando : boolean = false;
  private msgSucesso : string = null;
  private msgErro : string = null;
  private busca : string;
  private isAdmin : boolean = false;
  private idToDelete : number = 0;

  constructor(private alService : AluguelService) { }

  ngOnInit() {
    this.getAlugueis();
    let tipo : string = window.localStorage.getItem("tipo");
    if(tipo == "1"){
      this.isAdmin = true;
    }
  }

  getAlugueis() : any{
    this.requisitando = true;
    this.alService.getAlugueis()
    .then((response) => {
      this.listaAlugueis = response;
      this.requisitando = false;
    })
    .catch((response) => {
      this.mostraErro("houve um erro!") ; this.requisitando = false;
    });
  }
  cancelaAluguel(id : number){
    this.idToDelete = id;
  }

  confirmaDelete(id: number) {
    this.alService.deleteAluguel(id)
    .then(()=> {
      this.getAlugueis();
      this.mostraSucesso("deletado com sucesso!");
    })
    .catch();
  }
  cancelaDelete(){
    this.idToDelete = 0;
  }

  search(event){
    this.requisitando = true;
    this.alService.getReservasSeacrh(this.busca)
    .then((response) => {
      console.log(response);
      this.listaAlugueis = response;
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
