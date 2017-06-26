import { Component, OnInit } from '@angular/core';
import { ApartamentoService } from "./../service/apartamento.service";
import { UtilService } from "./../service/util.service";
import { ReservaService } from "./../service/reserva.service";

@Component({
  selector: 'app-create-reserva',
  templateUrl: './create-reserva.component.html',
  styleUrls: ['./create-reserva.component.css']
})
export class CreateReservaComponent implements OnInit {

  private dataInicio : any;
  private dataFim : any;
  private apartamentos : any[];
  private valor : any;
  private apartamento : any;
  private requisitando : boolean = false;
  private msgErr : string = null;
  private msgSucesso : string = null;
  private reserva : any;


  constructor(private apService : ApartamentoService,
              private util : UtilService,
              private resService : ReservaService
  ) { }

  ngOnInit() {
    this.getApartamentos();
  }


  getApartamentos(){
    this.requisitando = true;
    this.apService.getApartamentos()
    .then((response) => {
      this.apartamentos = response;
      this.requisitando = false;
    })
    .catch(() => {
      this.requisitando = false;
      this.mostraErro("Ops, houve um erro, tente novamente!")
    });
  }

  salvarReserva(){
    this.msgErr = null;
    if(this.validaCampos()){
      let user : any = JSON.parse(window.localStorage.getItem("user"));
      this.valor = this.util.calculaDifData(this.dataInicio,this.dataFim) * this.apartamento.valorDiaria;
      this.reserva = {
        dataInicio : this.util.formataDataBanco(this.dataInicio),
        dataFim : this.util.formataDataBanco(this.dataFim),
        valor : this.valor,
        user : user,
        apartamento : this.apartamento,
        reservado : 0
      };
      this.requisitando = true;
      this.resService.createReserva(this.reserva)
      .then((response) => {
        this.requisitando = false;
        this.msgErr = null;
        this.mostraSucesso("Reserva efetuada com sucesso");
      })
      .catch(() => { 
        this.requisitando = false;
        this.msgErr = null;
        this.mostraErro("Ops, houve um erro no servidor, tente novamente ou entre em contato");
      })
    }
  }

  calcularValor(event){
    this.valor = this.util.calculaDifData(this.dataInicio,this.dataFim) * this.apartamento.valorDiaria;
  }

  validaCampos() : any{
    let msg : string = "";
    let valido : boolean = true;
    if(this.dataInicio == "" || this.dataInicio == null || this.dataInicio == undefined){
      msg = msg + "Preencha o campo data inicio!";
      valido = false;
    }
    if(this.dataFim == "" || this.dataFim == null || this.dataFim == undefined){
      msg = msg + "Preencha o campo data fim!";
      valido = false;
    }
    if(this.apartamento == "" || this.apartamento == null || this.apartamento == undefined){
      msg = msg + "Selecione um apartamento!";
      valido = false;
    } 
    if(this.dataInicio > this.dataFim){
      msg = msg + "A data de fim deve ser maior que a data de início!"
      valido = false;
    }
    this.msgErr = msg;
    return valido;
  }

  mostraSucesso(msg : string){
    this.msgSucesso = msg;
    setTimeout(() => this.msgSucesso = null , 3000);
  }
  mostraErro(msg : string){
    this.msgErr = msg;
    setTimeout(() => this.msgErr = null , 3000);
  }

}
