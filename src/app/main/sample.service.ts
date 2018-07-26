import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SamplePage } from './sample-page';

@Injectable()
export class SampleService {
  private url = 'http://localhost:8080/sample';

  constructor(private http: HttpClient) { }

  findAll(): Observable<SamplePage> {
    return this.http.get<SamplePage>(this.url);
  }
}
