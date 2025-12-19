import { Routes } from '@angular/router';
import { QuestionListComponent } from './questions/question-list.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameResultsComponent } from './game-results/game-results.component'; // Import GameResultsComponent
import { QuestionManagement } from './question-management/question-management';

export const routes: Routes = [
  { path: '', redirectTo: '/game-setup', pathMatch: 'full' },
  { path: 'questions', component: QuestionListComponent },
  { path: 'game-setup', component: GameSetupComponent },
  { path: 'game/:gameId', component: GamePlayComponent },
  { path: 'game-results/:gameId', component: GameResultsComponent }, // Add route for GameResultsComponent
  { path: 'management', component: QuestionManagement }
];
