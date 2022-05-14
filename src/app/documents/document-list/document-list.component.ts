import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('1', 'WDD 130 - Web Fundamentals', 'This course introduces students to the World Wide Web and to careers in web site design and development.', 'url'),
    new Document('2', 'WDD 230 - Web Frontend Development I', 'This course focuses on the planning and development of responsive web sites using HTML, CSS, and JavaScript with attention to usability principles.', 'url'),
    new Document('3', 'WDD 330 - Web Frontend Development II', 'WDD 330 will continue with the topics presented in WDD 230 Web Front-end Development I.', 'url'),
    new Document('4', 'WDD 430 - Web Full-Stack Development', 'his course will teach you how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack.', 'url')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
