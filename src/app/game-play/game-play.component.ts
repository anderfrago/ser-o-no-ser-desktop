import { ChangeDetectionStrategy, Component, NgZone, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService, GameState } from '../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-play',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],

})
export class GamePlayComponent implements OnInit {
  gameId: string | null = null;
  gameState: GameState | null = null;
  loading = signal(false);
  isSubmitting = signal(false);
  error: string | null = null;
  selectedAnswerId: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    if (this.gameId) {
      this.fetchGameState();
    } else {
      this.error = 'No game ID provided.';
      this.loading.set(false);
    }
  }

  fetchGameState(): void {
    if (!this.gameId) return;

    this.loading.set(true);
    this.gameService.getGameState(this.gameId).subscribe({
      next: (state) => {
        if (state.gameover) {
          this.router.navigate(['/game-results', this.gameId]);
          return;
        }
        this.gameState = state;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching game state', err);
        this.error = 'Failed to load game state. Please try again.';
        this.loading.set(false);
      }
    });
  }

  selectAnswer(answerId: string): void {
    this.selectedAnswerId = answerId;
  }

  submitAnswer(): void {
    if (!this.gameId || this.selectedAnswerId === null) {
      this.error = 'Please select an answer.';
      return;
    }

    this.isSubmitting.set(true);

    // Call service immediately but wait at least 3 seconds to show result
    const minDelay$ = new Promise(resolve => setTimeout(resolve, 3000));
    const submit$ = this.gameService.submitAnswer(this.gameId, this.selectedAnswerId).toPromise();

    Promise.all([minDelay$, submit$])
      .then(([_, response]) => {
        console.log('Answer submitted:', response);
        this.selectedAnswerId = null; // Reset selection
        this.fetchGameState(); // Refresh game state
        this.isSubmitting.set(false);
      })
      .catch(err => {
        console.error('Error submitting answer', err);
        this.error = 'Failed to submit answer. Try again.';
        this.isSubmitting.set(false);
      });
  }

  viewScores(): void {
    if (this.gameId) {
      this.router.navigate(['/game-results', this.gameId], { queryParams: { returnToGame: true } });
    }
  }
}
