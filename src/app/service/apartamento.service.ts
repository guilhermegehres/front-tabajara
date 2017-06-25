import { Injectable } from '@angular/core';
import { HttpHandler } from './../http.handler';


@Injectable()
export class ApartamentoService {

  constructor(private http : HttpHandler) { }

  getApartamentos() : any{
    return this.http.get("/apartamento").then();
  }

}