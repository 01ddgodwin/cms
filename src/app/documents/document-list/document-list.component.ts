import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../documents.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  // documentId: string = "";

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }

}
