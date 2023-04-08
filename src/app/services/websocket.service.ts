import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus: boolean = false;
  constructor(private _socket: Socket) {
    this.checkStatus();
  }
  public checkStatus(): void {
    this._socket.on('connect', () => {
      this.socketStatus = true;
    });
    this._socket.on('disconnect', () => {
      this.socketStatus = false;
    });
  }
  public emit(evento: string, payload?: any, callback?: Function): void {
    this._socket.emit(evento, payload, callback);
  }
  public listen(evento: string): Observable<any> {
    return this._socket.fromEvent(evento);
  }
}
