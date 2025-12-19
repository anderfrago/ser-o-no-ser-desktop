import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService, GameState } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { Grupo } from '../models'; // Assuming Grupo is suitable for displaying final scores

@Component({
  selector: 'app-game-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {
  gameId: string | null = null;
  finalScores: Grupo[] = [];
  loading = signal(false);
  error: string | null = null;
  gameMode: string = ''; // To display the game mode in results

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    if (this.gameId) {
      this.fetchGameResults();
    } else {
      this.error = 'No game ID provided to display results.';
      this.loading.set(false);
    }
  }

  fetchGameResults(): void {
    if (!this.gameId) return;

    this.loading.set(true);
    // Assuming getGameState can provide final scores if the game is over
    this.gameService.getGameState(this.gameId).subscribe({
      next: (state: GameState) => {
        this.finalScores = state.teams.sort((a, b) => b.puntos - a.puntos); // Sort by points
        this.gameMode = state.mode;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching game results', err);
        this.error = 'Failed to load game results. Please try again.';
        this.loading.set(false);
      }
    });
  }

  goToGameSetup(): void {
    this.router.navigate(['/game-setup']);
  }
}
