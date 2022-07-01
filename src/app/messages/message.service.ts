import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messagesChangedEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = [];

  }

  // getMessages(): Message[] {
  //   return this.messages.slice();
  // }

  getMessages() {
    this.http.get<Message[]>('http://localhost:3000/messages').subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.messagesChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  storeMessages() {
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(
      'https://ng-cms-d18a4-default-rtdb.firebaseio.com/messages.json',
      messages,
      { headers: headers }
    )
    .subscribe(() => {
      this.messagesChangedEvent.next(this.messages.slice())
    })
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message) {
    if (!message) {
      return
    }

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http
    .post<{postMessage: string; message: Message}>(
      'http://localhost:3000/messages',
      message,
      { headers: headers }
    )
    .subscribe((responseData) => {
      //add new message to messages
      this.messages.push(responseData.message);
    });

  }

  getMaxId() {
    let maxId = 0;

    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId + 1;
  }

}
