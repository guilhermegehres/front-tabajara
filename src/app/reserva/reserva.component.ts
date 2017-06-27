import { Component, OnInit } from '@angular/core';
import { ReservaService } from './../service/reserva.service';
import { AluguelService } from './../service/aluguel.service';
import { UtilService } from './../service/util.service';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  private listaReservas : any[] = [];
  private reservaToModal : any;
  private msgSucesso : string = null;
  private msgErro : string = null;
  private requisitando : boolean = false;
  private idToDelete : number = 0;
  private isAdmin : boolean = false;
  private busca : string;


  constructor(private resService : ReservaService,
              private alService : AluguelService,
              public dialog: MdDialog,
              private util : UtilService) { }

  ngOnInit() {
    this.getReservas();
    let tipo : string = window.localStorage.getItem("tipo");
    if(tipo == "1"){
      this.isAdmin = true;
    }
  }

  getReservas(){
    this.requisitando = true;
    this.resService.getReservas()
    .then((response) => {this.listaReservas = response; this.requisitando = false;})
    .catch((response) => {this.mostraErro("houve um erro!") ; this.requisitando = false;});
  }

  confirmaReserva(reserva : any){
    let novoAluguel : any = reserva;
    reserva.reservado = 1;
    this.atualizaReserva(reserva);
    novoAluguel.id = null;
    novoAluguel.dataFim = this.util.formataDataBanco(new Date(novoAluguel.dataFim));
    novoAluguel.dataInicio = this.util.formataDataBanco(new Date(novoAluguel.dataInicio));
    this.alService.novoAluguel(novoAluguel)
    .then((response)=> { 
      if(response.id > 0){
        this.mostraSucesso("Aluguel Registrado com sucesso");
      }else{
        this.mostraErro("Houve um erro, tente novamente");
      }
    })
    .catch((err) => this.mostraErro("Houve um erro, tente novamente"));
  }

  atualizaReserva(reserva : any){
    reserva.dataFim = this.util.formataDataBanco(new Date(reserva.dataFim));
    reserva.dataInicio = this.util.formataDataBanco(new Date(reserva.dataInicio));
    this.resService.update(reserva).then().catch();
  }

  cancelaReserva(id : number){
    this.idToDelete = id;
  }

  confirmaDelete(id: number) {
    this.resService.deleteReserva(id)
    .then(()=> {
      this.getReservas();
      this.mostraSucesso("deletado com sucesso!");
    })
    .catch();
  }

  cancelaDelete(){
    this.idToDelete = 0;
  }

  search(event){
    this.requisitando = true;
    this.resService.getReservasSeacrh(this.busca)
    .then((response) => {
      this.listaReservas = response;
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
