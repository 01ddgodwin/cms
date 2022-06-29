import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef: ElementRef;
  currentSender = '1';

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onSendMessage() {
    const messSubject = this.subjectInputRef.nativeElement.value;
    const messMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(
      '1',
      messSubject,
      messMsgText,
      this.currentSender
    );

    if (messSubject && messMsgText) {
      this.messageService.addMessage(newMessage);
      this.onClear();
    }
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
