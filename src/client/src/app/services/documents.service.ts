import { Document } from '../models/documents.models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) {}

  create(documentDetail: Document): Observable<Document> {
    // first create the metadata
    const tmp: any = Object.assign({}, documentDetail);
    delete tmp.id;
    return this.http.post('/api/documents', tmp)
      .pipe(
        map((resp: any) => {
          if (resp !== null && resp.status === 'OK') {

            // upload the actual doc to server

            return resp.doc;
          }
          console.log('DocumentsService.create: returned ', {resp});
          return [];
        })
      );
  }

  delete(id: string): void {
    // first delete doc

    // next delete metadata
    this.http.delete(`/api/documents/${id}`)
      .subscribe((res: any) => {
        if (res !== null && res.status === 'OK') {
          console.log(`DocumentsService delete of ${id}: success`);
        } else {
          console.log(`DocumentsService delete of ${id}: failed`);
        }
      });
  }

  upload(ref, file) {

  }

  download(ref) {

  }

  findAll(): Observable<Array<Document>> {
    return this.http.get('/api/documents')
      .pipe(
        map((resp: any) => {
          if (resp !== null && resp.status === 'OK') {
            return resp.results;
          }
          console.log('DocumentsService.findAll: returned ', {resp});
          return [];
        })
      );
  }

  findById(id): Observable<Document> {
    return this.http.get(`/api/documents/${id}`)
      .pipe(
        map((resp: any) => {
          if (resp !== null && resp.status === 'OK') {
            return resp.result;
          }
          console.log('DocumentsService.findAll: returned ', {resp});
          return null;
        })
      );
  }
}
