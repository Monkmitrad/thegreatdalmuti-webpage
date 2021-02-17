import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Constants } from '../shared/config/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private constants: Constants
  ) { }

  private get(url: string, options?: any): Observable<any> {
    return this.http.get(this.constants.API_ENDPOINT + url, options);
  }

  private post(url: string, data?: any, options?: any): Observable<any> {
    return this.http.post(this.constants.API_ENDPOINT + url, data, options).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error.response) {            
            // error created by the game logic
            return of(err.error.response);
          }
        }

        return throwError(err);    // rethrow it back to component
      })
    );
  }

  public createGame(): Observable<number> {
    return this.post('create').pipe(map((response: { response: number }) => response.response));
  }

  public login(gameID: number, name: string): Observable<string> {
    return this.post('login', { gameID, playerName: name }).pipe(map((response) => response.response));
  }

  public ready(status: boolean, token: string): void {
    this.post('ready', { status }, {headers: new HttpHeaders().set('Authorization', token)}).subscribe((response: { response: string }) => response.response);
  }
}
