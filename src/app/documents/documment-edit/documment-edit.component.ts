import { Component, OnInit } from '@angular/core';
import { identifierName } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../documents.model';

@Component({
  selector: 'app-documment-edit',
  templateUrl: './documment-edit.component.html',
  styleUrls: ['./documment-edit.component.css'],
})
export class DocummentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(id);

      if (
        this.originalDocument === undefined ||
        this.originalDocument === null
      ) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      this.documentService.maxDocumentId.toString(),
      value.name,
      value.descrption,
      value.url
    );
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
