import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messagesChangedEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = [];

    http
      .get<Message[]>(
        'https://ng-cms-d18a4-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messagesChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );

  }

  // getMessages(): Message[] {
  //   return this.messages.slice();
  // }

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
    this.messages.push(message);
    this.storeMessages();
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
