import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fondo } from '../models/fondo.model';

@Injectable({
  providedIn: 'root'
})
export class FondosService {
  private apiUrl = 'https://qvddtpujij.execute-api.us-east-1.amazonaws.com/dev/fondos'; // URL de la API REST

  constructor(private http: HttpClient) { }

  getFondos(): Observable<Fondo[]> {
    return this.http.get<Fondo[]>(this.apiUrl);
  }

  getFondo(id: number): Observable<Fondo> {
    return this.http.get<Fondo>(`${this.apiUrl}/${id}`);
  }

  createFondo(fondo: Fondo): Observable<Fondo> {
    return this.http.post<Fondo>(this.apiUrl, fondo);
  }

  updateFondo(fondo: Fondo): Observable<Fondo> {
    return this.http.put<Fondo>(`${this.apiUrl}/${fondo.id}`, fondo);
  }

  deleteFondo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
