import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './../login/login.component';
import { ReservaComponent } from './../reserva/reserva.component';
import { AluguelComponent } from './../aluguel/aluguel.component';
import { UnauthComponent } from './../unauth/unauth.component';
import { NovoUserComponent } from './../novo-user/novo-user.component';
import { ListaUsuariosComponent } from './../lista-usuarios/lista-usuarios.component';
import { CreateReservaComponent } from './../create-reserva/create-reserva.component';
import { LoginGuard } from './../guards/login.guard';
import { AdminGuard } from './../guards/admin.guard';

const routes : Routes = [
  {path : "" , component : ReservaComponent, canActivate : [LoginGuard]},
  {path : "reserva" , component : ReservaComponent, canActivate : [LoginGuard, AdminGuard]},
  {path : "aluguel" , component : AluguelComponent, canActivate : [LoginGuard, AdminGuard]},
  {path : "usuarios" , component : ListaUsuariosComponent, canActivate : [LoginGuard, AdminGuard]},
  {path : "newReserva" , component : CreateReservaComponent, canActivate : [LoginGuard]},
  {path : "login" , component : LoginComponent},
  {path : "unauth" , component : UnauthComponent},
  {path : "newUser" , component : NovoUserComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule],
  declarations: []
})
export class RoutesModule { }