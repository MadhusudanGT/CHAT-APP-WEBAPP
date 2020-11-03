import { Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
    socket: SocketIOClient.Socket;
    
    constructor() {
        this.socket = io.connect('http://localhost:3000');
    }

    listen(eventname: string) : Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventname, (data) => {
                subscriber.next(data);
            })
        })
    }

    emit(eventname: string, data: any) {
        this.socket.emit(eventname, data);
    }

SetUserName(username:string,password:any){
    var loginDetails={ 
        username : username,
        password : password 
        };
        console.log(loginDetails)
    this.socket.emit('setUsername', loginDetails);

    this.socket.on('userExists', function(data) {
        return "choose onther name user alredy exist"+data;
     });

     this.socket.on('userExists', function(data){
         console.log(`${data.username} is alredy exist`)
         return data;
     })
     this.socket.on('userSet', function(data){
        
        return data;
    } )
}


}
