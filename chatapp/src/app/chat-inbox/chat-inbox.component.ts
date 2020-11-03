import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import * as io from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})


export class ChatInboxComponent implements OnInit {
  title = 'Websocket Angular client ';
  userName: string;
  password:any;
  message: string;
  output: any[] = [];
  feedback: string;
  userexists:string;
  userexistlist:any[]=[];
  public show:boolean = false;
  public reg:boolean = true;

  constructor(private webSocketService:ChatService) { }
  ngOnInit(): void {
    this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));
    this.webSocketService.listen('userExists').subscribe((data)=>this.userexist(data))
    this.webSocketService.listen('userSet').subscribe((data)=>this.currentuserlist(data))
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);    
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";    
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }

  registerMessage(){
    //************** */
    this.webSocketService.SetUserName(this.userName,this.password);
    //************** */

    this.show=true;
    this.reg=false;
  }

  userexist(data:any){
this.userexists=  `${data} is alredy exist please chose onther name`
this.reg=true;
this.show=false;
  }

  currentuserlist(data){
    console.log(data)
this.userexistlist=data;

  }
}