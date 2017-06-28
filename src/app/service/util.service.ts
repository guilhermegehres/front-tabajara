import { Injectable } from '@angular/core';
import { HttpHandler } from './../http.handler';


@Injectable()
export class UtilService{

    public userToEdit : any;

    formataDataBanco(data : Date) : any{
        let dia : any = data.getDate();
        if (dia.toString().length == 1){
            dia = "0"+dia;
        }
        let mes : any = data.getMonth()+1;
        if (mes.toString().length == 1)
            mes = "0"+mes;
        let ano = data.getFullYear();  
        return ano+"-"+mes+"-"+dia;
    }

    isEmptyUserToEdit() : any {
        if(this.userToEdit == null || this.userToEdit == undefined){
            return false;
        }
        return this.userToEdit;
    }

    isLogged() : boolean{
        let user = window.localStorage.getItem("user");
        if(user == null){
            return false;
        }
        return true;
    }

    calculaDifData(date1, date2){
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
    }

    validaCpf(strCPF : string){
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;
        
        for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
        
        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    validaEmail(field : string) {
        let usuario = field.substring(0, field.indexOf("@"));
        let dominio = field.substring(field.indexOf("@")+ 1, field.length);

        if ((usuario.length >=1) &&
            (dominio.length >=3) && 
            (usuario.search("@")==-1) && 
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) && 
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&      
            (dominio.indexOf(".") >=1)&& 
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            return true;
        }
        else{
            return false;
        }
    }
}