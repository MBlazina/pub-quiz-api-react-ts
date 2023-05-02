export interface QuizDto {
  id: number;
  name: string;
  questions: QuestionsDto[];
}

export interface QuestionsDto {
  id: number;
  question: string;
  answer: string;
}
