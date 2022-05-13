import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('nameInput') subjectInputRef!: ElementRef;
  @ViewChild('amountInput') msgTextInputRef!: ElementRef;
  @Output() messageSent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const messSubject = this.subjectInputRef.nativeElement.value;
    const messMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message("1",messSubject, messMsgText, "Dillon");
    this.messageSent.emit(newMessage);
  }

  onClear() {

  }

}
