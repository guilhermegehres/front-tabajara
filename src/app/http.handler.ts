import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
//import { Observable }     from 'rxjs/Observable';

@Injectable()
export class HttpHandler {

    private url = 'http://localhost:8080/tabajara-api/api';

    private headers : Headers;

    setHeader(token){
        if(token != null || token != "" || token != undefined){
            this.headers = new Headers({
                'Content-Type': 'application/json',
                "Authorization" : token
            });
        }
    }

    constructor(private http: Http) {}

    get(path : string, params? : URLSearchParams) : Promise<any> {
        this.setHeader(window.localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: this.headers,
            search: params
        });
        return this.http.get(this.url+path, options)
        .toPromise()
        .then(res => res.json())
        .catch(err=>this.handleError(err));
    }

    post(path : string, bodyJson : any) : Promise<any>{
        this.setHeader(window.localStorage.getItem('token'));
        return this.http.post(this.url+path, bodyJson, {headers : this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(err=>this.handleError(err));
    }

    delete(path : string, id : number){
        this.setHeader(window.localStorage.getItem('token'));
        return this.http.delete(this.url+path+"/"+id, {headers : this.headers})
        .toPromise()
        .then( res => {res;console.log(res)})
        .catch( err => this.handleError(err))
    }

    put(path : string, bodyJson : any, id : number){
        this.setHeader(window.localStorage.getItem('token'));
        return this.http.put(this.url+path+"/"+id, bodyJson, {headers : this.headers})
        .toPromise()
        .then( res => {res;console.log(res.json())})
        .catch( err => this.handleError(err))
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}