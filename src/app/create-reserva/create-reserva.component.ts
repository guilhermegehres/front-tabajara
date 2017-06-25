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
  private valid : string = null;
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
    .catch(() => {this.requisitando = false});
  }

  salvarReserva(){
    this.valid = null;
    if(this.validaCampos() == ""){
      let user : any = window.localStorage.getItem("user");
      this.valor = this.util.calculaDifData(this.dataInicio,this.dataFim) * this.apartamento.valorDiaria;
      this.reserva = {
        dataInicio : this.util.formataDataBanco(this.dataInicio),
        dataFim : this.util.formataDataBanco(this.dataFim),
        valor : this.valor,
        user : {
          id : user.id
        },
        apartamento : {
          id : this.apartamento.id
        }
      };
      console.log(this.reserva);
      this.requisitando = true;
      this.resService.createReserva(this.reserva)
      .then((response) => {
        console.log(response);
        this.requisitando = false;
      })
      .catch(() => { 
        console.log("error");
        this.requisitando = false;
      })
    }
  }

  calcularValor(event){
    this.valor = this.util.calculaDifData(this.dataInicio,this.dataFim) * this.apartamento.valorDiaria;
  }

  validaCampos() : any{
    let msg : string = "";
    if(this.dataInicio == "" || this.dataInicio == null || this.dataInicio == undefined){
      msg = msg + "\nPreencha o campo data inicio!";
    }
    if(this.dataFim == "" || this.dataFim == null || this.dataFim == undefined){
      msg = msg + "<br />Preencha o campo data fim!";
    }
    if(this.apartamento == "" || this.apartamento == null || this.apartamento == undefined){
      msg = msg + "\nSelecione um apartamento!";
    } 
    this.valid = msg;
    return msg;
  }

}
