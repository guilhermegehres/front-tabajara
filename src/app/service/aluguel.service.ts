import { Injectable } from '@angular/core';
import { HttpHandler } from './../http.handler';


@Injectable()
export class AluguelService {

  constructor(private http : HttpHandler) { }

  novoAluguel(aluguel : any) : any{
    return this.http.post("/aluguel", aluguel)
    .then();
  }
}