import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef: ElementRef;
  //@Output() messageSent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const messSubject = this.subjectInputRef.nativeElement.value;
    const messMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message("1", messSubject, messMsgText, "Dillon");
    //this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
