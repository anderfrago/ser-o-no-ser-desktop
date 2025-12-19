// ser-o-no-ser-ng/src/app/services/question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getQuestionsSummary(): Observable<Partial<Pregunta>[]> {
    return this.http.get<Partial<Pregunta>[]>(`${this.apiUrl}/questions`);
  }

  getQuestionById(id: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${this.apiUrl}/questions/${id}`);
  }
}
