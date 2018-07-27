import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SamplePage } from './sample-page';

@Injectable()
export class SampleService {
  private url = 'http://localhost:8080/sample';

  constructor(private http: HttpClient) { }

  findAll(pageNumber = null, pageSize = null): Observable<SamplePage> {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.set('page', pageNumber);
    }
    if (pageSize) {
      params = params.set('size', pageSize);
    }
    return this.http.get<SamplePage>(this.url, {params});
  }
}
