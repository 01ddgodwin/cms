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
    new Document('1', 'Dillon', 'Description', 'url'),
    new Document('2', 'Joe', 'Description', 'url'),
    new Document('3', 'Bob', 'Description', 'url'),
    new Document('4', 'Steve', 'Description', 'url')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
