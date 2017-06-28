import { Injectable } from '@angular/core';
import { HttpHandler } from './../http.handler';
import { URLSearchParams } from '@angular/http';


@Injectable()
export class AluguelService {

  constructor(private http : HttpHandler) { }

  novoAluguel(aluguel : any) : any{
    return this.http.post("/aluguel", aluguel)
    .then();
  }
  getAlugueis(): any{
    return this.http.get('/aluguel').then();
  }

  deleteAluguel(id : number) : any{
    return this.http.delete("/aluguel", id).then();
  }

  getReservasSeacrh(search : string) : any{
    let params : URLSearchParams = new URLSearchParams();
    params.append('search', search);
    return this.http.get("/aluguel/search", params)
    .then();
  }

}