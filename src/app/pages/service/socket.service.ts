import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private $isConnect: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  currentIsConnect = this.$isConnect.asObservable();
  socket: Socket;
  constructor() { }
  setupSocketConnection() {
    this.socket = io('http://192.168.1.113', {
      forceNew: true,
      autoConnect: true,
      reconnection: true,
      secure: false,
      reconnectionDelay: 4000,
      transports: ["websocket"],
    });
    this.socket.on('disconnect', () => {
      console.error('Socket disconnected');
      this.$isConnect.next(false);
      // this.setupSocketConnection();
    });
    // this.send('authentication', { token: this.localStorageService.getToken() });
    this.socket.on('connect', () => {
      this.send('authentication', { token: localStorage.getItem('token') });
      this.$isConnect.next(true);
      console.warn('Socket connected');
    });
    this.socket.on('connect_error', () => {
      console.warn('Socket connect_error');
    });
    this.socket.on('connect_timeout', () => {
      console.warn('Socket connect_timeout');
    });
    this.socket.on('connecting', () => {
      console.warn('Socket connecting');
    });
    this.socket.on('reconnect', () => {
      console.warn('Socket reconnect');
    });
    this.socket.on('reconnect_attempt', () => {
      console.warn('Socket reconnect_attempt');
    });
    this.socket.on('reconnect_failed', () => {
      console.warn('Socket reconnect_failed');
    });
    this.socket.on('reconnect_error', () => {
      console.warn('Socket reconnect_error');
    });
    this.socket.on('reconnecting', () => {
      console.warn('Socket reconnecting');
    });
    this.socket.on('ping', () => {
      console.warn('Socket ping');
    });
  }
  updateStateInternet(state: boolean) {
    this.$isConnect.next(state);
  }
  getStateInternet() {
    return this.currentIsConnect;
  }

  public send(eventName: string, payload: any) {
    this.socket.emit(eventName, payload);
  }

  public receive(eventName: string){
    return Observable.create((observer) => {
      this.socket.on(eventName, (msg) => {
        observer.next(msg);
      });
    });
  }

  public clearListenScoket(eventName: string) {
    this.socket.off(eventName);
  }

}
