import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QuestionAdmin {
  private apiUrl = '/api/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.apiUrl);
  }

  getQuestion(id: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${this.apiUrl}/${id}`);
  }

  addQuestion(question: Partial<Pregunta>): Observable<Pregunta> {
    return this.http.post<Pregunta>(this.apiUrl, question);
  }

  updateQuestion(question: Pregunta): Observable<Pregunta> {
    return this.http.put<Pregunta>(`${this.apiUrl}/${question.idPregunta}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadQuestions(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post('/api/upload-questions', formData);
  }
}
