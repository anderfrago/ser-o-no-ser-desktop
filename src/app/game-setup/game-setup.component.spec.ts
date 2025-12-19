import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSetupComponent } from './game-setup.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('GameSetupComponent', () => {
  let component: GameSetupComponent;
  let fixture: ComponentFixture<GameSetupComponent>;
  let mockGameService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockGameService = {
      setupGame: jasmine.createSpy('setupGame').and.returnValue(of({ gameId: '123', message: 'Game created' }))
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, GameSetupComponent],
      providers: [
        FormBuilder,
        { provide: GameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one team and default mode', () => {
    expect(component.teams.length).toBe(1);
    expect(component.gameSetupForm.get('mode')?.value).toBe('cielo');
  });

  it('should add a team', () => {
    component.addTeam();
    expect(component.teams.length).toBe(2);
  });

  it('should remove a team', () => {
    component.addTeam();
    component.removeTeam(0);
    expect(component.teams.length).toBe(1);
  });

  it('should call setupGame and navigate on valid form submission', () => {
    component.gameSetupForm.patchValue({
      mode: 'cielo'
    });
    component.teams.at(0).patchValue({ name: 'Team A', color: '#FF0000' });
    component.onSubmit();

    expect(mockGameService.setupGame).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/game', '123']);
  });

  it('should not call setupGame on invalid form submission', () => {
    component.gameSetupForm.patchValue({
      mode: '' // Invalid mode
    });
    component.onSubmit();
    expect(mockGameService.setupGame).not.toHaveBeenCalled();
  });
});
