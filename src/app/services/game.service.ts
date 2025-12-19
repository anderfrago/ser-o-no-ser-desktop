// ser-o-no-ser-ng/src/app/services/game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo, Pregunta, Respuesta } from '../models';

export interface TeamSetup {
  name: string;
  color: string;
}

export interface GameSetupRequest {
  teams: TeamSetup[];
  mode: 'cielo' | 'infierno';
}

export interface GameSetupResponse {
  gameId: string;
  message: string;
}

export interface GameState {
  gameover?: boolean;
  teams: Grupo[]; // Re-using Grupo for teams, assuming it will have name, points, etc.
  mode: 'cielo' | 'infierno';
  currentTurn: number;
  currentQuestion: Pregunta;
  panelNumber: number;
  totalPanels: number;
}

export interface AnswerSubmissionResponse {
  wasCorrect: boolean;
  correctAnswer: boolean; // Indicates if the submitted answer was the correct one from the API's perspective
  nextTurn: number;
  scores: Grupo[];
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  setupGame(setupData: GameSetupRequest): Observable<GameSetupResponse> {
    return this.http.post<GameSetupResponse>(`${this.apiUrl}/game/setup`, setupData);
  }

  getGameState(gameId: string): Observable<GameState> {
    return this.http.get<GameState>(`${this.apiUrl}/game/${gameId}`);
  }

  submitAnswer(gameId: string, answerId: string): Observable<AnswerSubmissionResponse> {
    return this.http.post<AnswerSubmissionResponse>(`${this.apiUrl}/game/${gameId}/answer`, { answerId });
  }
}
