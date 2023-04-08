import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GraficaService {
  constructor(private _http: HttpClient) {}
  public getData() {
    return this._http.get('http://localhost:5000/grafica');
  }
}
