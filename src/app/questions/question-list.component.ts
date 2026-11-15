import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Pregunta } from '../models';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports for ngFor, etc.
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: Partial<Pregunta>[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestionsSummary().subscribe({
      next: (data) => {
        this.questions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching questions', err);
        this.error = 'No se han podido cargar las preguntas. Inténtalo más tarde.';
        this.loading = false;
      }
    });
  }
}
