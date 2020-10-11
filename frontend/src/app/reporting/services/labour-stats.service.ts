import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LabourStats } from '../domain/labour-stats.model';

@Injectable({
  providedIn: 'root'
})
export class LabourStatsService {

  private labourStatsUrl = 'application/labourstats'; 

  constructor(private http: HttpClient) { }

  getLabourStats(): Observable<LabourStats[]> {
    return this.http.get<LabourStats[]>(this.labourStatsUrl).pipe(
      catchError(this.handleError<LabourStats[]>([{}]))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
