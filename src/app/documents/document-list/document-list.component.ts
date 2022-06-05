import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DocumentService } from '../document.service';
import { Document } from '../documents.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscripton: Subscription;  

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.subscripton = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });

  }

  ngOnDestroy(): void {
    this.subscripton.unsubscribe();
  }

}
