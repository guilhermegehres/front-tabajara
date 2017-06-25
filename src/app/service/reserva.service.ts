import { Injectable } from '@angular/core';
import { HttpHandler } from './../http.handler';


@Injectable()
export class ReservaService {

  constructor(private http : HttpHandler) { }

  getReservas() : any{
    return this.http.get("/reserva")
    .then();
  }

  deleteReserva(id : number) : any{
    return this.http.delete("/reserva", id).then();
  }

  createReserva(reserva : any){
    return this.http.post("/reserva",reserva).then();
  }

  update(reserva : any) : any{
    return this.http.put("/reserva",reserva, reserva.id).then();
  }

}
