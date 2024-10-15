import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import quizz_questions from "../../../app/assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  @Input()
  title: string = "";

  questions: any;
  questionSelected: any;

  answers: string[] = []
  answersSelect: string = "";

  questionIndex: number = 0;
  questionsMaxIndex: number = 0;

  finished: boolean = false;

  constructor() {

  }
  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
    
      this.questionIndex = 0;
      this.questionsMaxIndex = this.questions.length;
      console.log(this.questionsMaxIndex);
    }
  }
  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;

    if (this.questionsMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answersSelect = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(anwsers: string[]) {
    const result = anwsers.reduce((previous, current, i, array) => {
      if (array.filter(item => item === previous).length > array.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    })
    return result;
  }

}
