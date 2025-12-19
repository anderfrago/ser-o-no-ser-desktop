import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { GameService, TeamSetup, GameSetupRequest } from '../services/game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent {
  gameSetupForm: FormGroup;
  gameModes = ['cielo', 'infierno']; // Assuming these are the valid modes

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    console.log('GameSetupComponent constructor called!');
    this.gameSetupForm = this.fb.group({
      teams: this.fb.array([this.createTeamFormGroup()]),
      mode: [this.gameModes[0], Validators.required]
    });
  }

  createTeamFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required] // Default color
    });
  }

  get teams(): FormArray {
    return this.gameSetupForm.get('teams') as FormArray;
  }

  addTeam(): void {
    this.teams.push(this.createTeamFormGroup());
  }

  removeTeam(index: number): void {
    this.teams.removeAt(index);
  }

  onSubmit(): void {
    if (this.gameSetupForm.valid) {
      const setupRequest: GameSetupRequest = this.gameSetupForm.value;
      this.gameService.setupGame(setupRequest).subscribe({
        next: (response) => {
          console.log('Game setup successful:', response);
          // Navigate to a game-in-progress or question selection screen
          this.router.navigate(['/game', response.gameId]);
        },
        error: (err) => {
          console.error('Game setup failed:', err);
          // Handle error, e.g., display an error message
        }
      });
    }
  }
}
