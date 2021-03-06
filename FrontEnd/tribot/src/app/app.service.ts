import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AppService {
  constructor(private http: Http){
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getPuntos() {
    // return this.http.get('http://swapi.co/api/people/1')
    return this.http.get('http://0.0.0.0:8000/destinos')
    .map((res:Response) => res.json());
  }

  getTop5(){
    return this.http.get('http://0.0.0.0:8000/ranking')
    .map((res:Response) => res.json());
  }

  sendPuntos(partida, destino) {
    var headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({"inicio": partida, "destino": destino});
    console.log(body)

    return this.http.post('http://0.0.0.0:8000/transporte_disponible', body, {headers: headers}).map((res:Response) => res.json());
  }

  sendTransporte(transporte, partida, destino){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({"transporte": transporte, "inicio": partida, "destino": destino});
    console.log(body)

    return this.http.post('http://0.0.0.0:8000/tarifa', body, options).map((res:Response) => res.json());
  }

}
