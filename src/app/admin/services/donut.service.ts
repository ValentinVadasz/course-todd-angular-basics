import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {catchError, map, of, retry, tap, throwError} from 'rxjs';

import {Donut} from '../models/donut.model';

@Injectable()
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {
  }

  read() {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    const options = {
      headers
    };

    return this.http.get<Donut[]>('/api/donuts', options)
      .pipe(
        tap((donuts) => {
          this.donuts = donuts;
        }),
        retry({count: 2, delay: 1000}),
        catchError(this.handleError)
      );
  }

  readOne(id: string | null) {
    return this.read().pipe(
      map(donuts => {
        const donut = donuts.find(
          (donut: Donut) => donut.id === id);

        if (donut)
          return donut;

        return {name: '', icon: '', price: 0, description: ''};
      }),
      catchError(this.handleError)
    );

  }

  create(payload: Donut) {
    return this.http.post<Donut>('/api/donuts', payload)
      .pipe(
        tap(donut => this.donuts = [...this.donuts, donut]),
        catchError(this.handleError)
      );
  }

  update(payload: Donut) {

    return this.http
      .put<Donut>(`api/donuts/${payload.id}`, payload)
      .pipe(
        tap(donut => {
          this.donuts = this.donuts.map((item: Donut) => {
            if (item.id === donut.id) {
              return donut;
            }
            return item;
          });
        }),
        catchError(this.handleError)
      );

    // const index = this.donuts.findIndex(x => x.id == payload.id);
    // this.donuts[index] = payload;
    // this.donuts = [...this.donuts];
  }

  delete(payload: Donut) {
    return this.http
      .delete<Donut>(`api/donuts/${payload.id}`)
      .pipe(
        tap(() => this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id)),
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client-side error
      console.warn('Client', error.message)
    } else {
      // server-side error
      console.warn('Server', error.status)
    }
    return throwError(() => new Error(error.message));
  }
}
