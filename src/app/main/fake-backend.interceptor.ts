import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpEvent } from '@angular/common/http/src/response';
import { HttpRequest } from '@angular/common/http/src/request';
import { HttpHandler } from '@angular/common/http/src/backend';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      if (req.url.endsWith('/users/login') && req.method === 'POST') {
        const body = {
          username: req.body.username,
          token: 'fake-jwt-token'
        };
        return of(new HttpResponse({status: 200, body}));
      }
      return next.handle(req);
    }))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());
  }
}

export let FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
