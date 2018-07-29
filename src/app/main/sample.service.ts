import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SamplePage } from './sample-page';
import { Sample } from './sample';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

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

  create(sample: Sample): Observable<any> {
    return this.http.post(this.url, sample, httpOptions);
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
