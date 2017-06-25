import { Injectable } from '@angular/core';
import { HttpHandler } from './../http.handler';


@Injectable()
export class UtilService{
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

    calculaDifData(date1, date2){
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
    }
}