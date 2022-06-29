import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './documents.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelected = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = [];
    this.maxDocumentId = this.getMaxId();

    http
      .get<Document[]>(
        'https://ng-cms-d18a4-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
    
  }

  // getDocuments() {
  //   this.http
  //     .get<Document[]>(
  //       'https://ng-cms-d18a4-default-rtdb.firebaseio.com/documents.json'
  //     )
  //     .subscribe(
  //       (documents: Document[]) => {
  //         this.documents = documents;
  //         this.maxDocumentId = this.getMaxId();
  //         this.documents.sort((a, b) =>
  //           a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  //         );
  //         this.documentListChangedEvent.next(this.documents.slice());
  //       },
  //       (error: any) => {
  //         console.log(error);
  //       }
  //     );
  // }

  storeDocuments() {
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(
      'https://ng-cms-d18a4-default-rtdb.firebaseio.com/documents.json',
      documents,
      { headers: headers }
    )
    .subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice())
    });
  }

  getDocument(index: number) {
    return this.documents[index];
  }

  getContact(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    let newId = +newDocument.id;
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const index = this.documents.indexOf(originalDocument);
    if (index < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[index] = newDocument;
    this.storeDocuments();
  }
}
