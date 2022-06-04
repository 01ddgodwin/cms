import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../documents.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelected.emit(document);
  }

}
