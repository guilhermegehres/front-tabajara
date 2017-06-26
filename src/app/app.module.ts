import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import 'hammerjs';
import { LoginComponent } from './login/login.component';
import { RoutesModule } from './routes/routes.module';
import { MaterialImportsModule } from './material-imports/material-imports.module';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { HttpHandler } from "./http.handler";
import { ReservaComponent } from './reserva/reserva.component';
import { MenuTopoComponent } from './menu-topo/menu-topo.component';
import { ReservaService } from './service/reserva.service';
import { AluguelService } from './service/aluguel.service';
import { UserService } from './service/user.service';
import { UtilService } from './service/util.service';
import { ApartamentoService } from './service/apartamento.service';
import {MdDialog, OVERLAY_PROVIDERS, MdNativeDateModule} from '@angular/material';
import { CreateReservaComponent } from './create-reserva/create-reserva.component';
import { UnauthComponent } from './unauth/unauth.component';
import { NovoUserComponent } from './novo-user/novo-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReservaComponent,
    MenuTopoComponent,
    CreateReservaComponent,
    UnauthComponent,
    NovoUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutesModule,
    MaterialImportsModule, 
    MdNativeDateModule
  ],
  entryComponents: [],
  providers: [
    LoginGuard,
    AdminGuard,
    HttpHandler,
    ReservaService, 
    AluguelService,
    MdDialog, 
    OVERLAY_PROVIDERS,
    UtilService,
    ApartamentoService,
    UserService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
