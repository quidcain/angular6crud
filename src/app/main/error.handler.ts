import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerImpl implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        alert('Unauthorized!');
      }
    }
    console.log('ok');
  }
}
