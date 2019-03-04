import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from 'src/app/models/documents.models';

@Component({
    selector: 'app-view-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})

export class DocumentsComponent implements OnInit {
    model: any = {
        documentList: [],
        isSelected: false,
        selectedFile: null,
        fileDesc: ''
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private documentsService: DocumentsService
        ) {}

    ngOnInit() {
        this.loadDocuments();
    }

    onFileSelected(event) {
        this.model.selectedFile = event.target.files[0];
        this.model.isSelected = true;
    }

    onUpload() {
      // check to make sure a file is available
      if (!this.model.isSelected) {
        console.log('DocumentComponent.onUpload(): file not selected.');
        return;
      }
      // do any validation on the model
      const docDetails: Document = new Document(
        null, null,
        this.model.selectedFile.name, this.model.selectedFile.type,
        null,
        this.model.fileDesc
      );

      this.documentsService.create(docDetails)
        .subscribe(
          doc => {
            // check that the doc is not null and it contains a valid doc_ref
            if (doc && doc !== null) {

              // now upload the file using the document ref
              const fileUploader: FileUploader = new FileUploader({
                url: `\\api\\documentServer\\${doc.ref}\\upload`
              });

              // fileUploader.addToQueue([this.model.selectedFile]);

              this.model.selectedFile = null;
              this.model.isSelected = false;
              this.model.fileDesc = '';
              this.loadDocuments();
            }
          }
        );
    }

    loadDocuments() {
        this.documentsService.findAll()
            .subscribe(docs => {
                let i = 0;
                if (!docs || docs === null) {
                    docs = [];
                }
                this.model.documentList = docs.map(doc => {
                    doc.num = `${++i}`;
                    return doc;
                });
            });
    }

    delete(id) {
        console.log(`delete called for id = ${id}`);
        this.documentsService.delete(id);
        this.loadDocuments();
    }

    get diagnostics() {
      return 'hey there!! ' + JSON.stringify(this.model);
    }
}
