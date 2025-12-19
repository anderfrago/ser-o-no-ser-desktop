import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionListComponent } from './question-list.component';
import { QuestionService } from '../services/question.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  let mockQuestionService: any;

  const mockQuestions = [
    { idPregunta: 1, titulo: 'Question 1', habilitado: true },
    { idPregunta: 2, titulo: 'Question 2', habilitado: false }
  ];

  beforeEach(async () => {
    mockQuestionService = {
      getQuestionsSummary: jasmine.createSpy('getQuestionsSummary').and.returnValue(of(mockQuestions))
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, QuestionListComponent],
      providers: [
        { provide: QuestionService, useValue: mockQuestionService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load questions on init', () => {
    expect(component.questions).toEqual(mockQuestions);
    expect(component.loading).toBeFalse();
    expect(mockQuestionService.getQuestionsSummary).toHaveBeenCalled();
  });

  it('should display loading message initially', () => {
    component.loading = true; // Manually set loading to true for this test
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-spinner')).not.toBeNull();
  });


  it('should display error message on fetch error', () => {
    mockQuestionService.getQuestionsSummary.and.returnValue(throwError(() => new Error('Test Error')));
    component.ngOnInit(); // Re-run ngOnInit to trigger the error path
    fixture.detectChanges();
    expect(component.error).not.toBeNull();
    expect(component.loading).toBeFalse();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-message')).not.toBeNull();
  });

  it('should display no questions message if no questions are returned', () => {
    mockQuestionService.getQuestionsSummary.and.returnValue(of([]));
    component.ngOnInit(); // Re-run ngOnInit to trigger the empty path
    fixture.detectChanges();
    expect(component.questions.length).toBe(0);
    expect(component.loading).toBeFalse();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.no-questions')).not.toBeNull();
  });
});
