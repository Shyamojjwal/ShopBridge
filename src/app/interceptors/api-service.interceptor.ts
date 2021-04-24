import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError} from 'rxjs';
import { environment } from "src/environments/environment";
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class ApiServiceInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      url: [environment.API_BASE_URL, request.url].join('/')
    })
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
      }),catchError((error: HttpErrorResponse) => {
        return throwError(this.errorHandler(request, error))
      })
    );
  }

  errorHandler = (request:any, error: any) => {
    console.log("Interceptor Error Handler: ", error)
    return error
  }
}
