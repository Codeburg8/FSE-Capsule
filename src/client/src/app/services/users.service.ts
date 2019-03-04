import { User } from '../models/user.model';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  create(userDetail: User): Observable<User> {
    const tmp: any = Object.assign({}, userDetail);
    delete tmp.id;
    return this.http.post('/api/users', tmp)
      .pipe(
        map((resp: any) => {
          if (resp !== null && resp.status === 'OK') {
            return resp.user;
          }
          console.log('UserService.create: returned ', {resp});
          return [];
        })
      );
  }

  update(id, userDetail: User): Observable<User> {
    const tmp: any = Object.assign({}, userDetail);
    delete tmp.id;
    return this.http.put(`/api/users/${id}`, tmp)
      .pipe(
        map((resp: any) => {
          if (resp !== null && resp.status === 'OK') {
            return resp.result;
          }
          console.log('UserService.findAll: returned ', {resp});
          return [];
        })
      );
  }

  delete(id: string): void {
    this.http.delete(`/api/users/${id}`)
      .subscribe((res: any) => {
        if (res !== null && res.status === 'OK') {
          console.log(`delete of ${id}: success`);
        } else {
          console.log(`delete of ${id}: failed`);
        }
      });
  }

  findAll(): Observable<Array<User>> {
    return this.http.get('/api/users')
      .pipe(
        map((resp: any) => {
          if (resp !== null && resp.status === 'OK') {
            return resp.results;
          }
          console.log('UserService.findAll: returned ', {resp});
          return [];
        })
      );
  }

  findById(id): Observable<User> {
    return this.http.get(`/api/users/${id}`)
      .pipe(
        map((resp: any) => {
          if (resp !== null && resp.status === 'OK') {
            return resp.result;
          }
          console.log('UserService.findAll: returned ', {resp});
          return null;
        })
      );
  }
}
