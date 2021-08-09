export class UserAnswer {
  constructor (questionId: string, answerId: string) {
    this.AnswerId = answerId
    this.QuestionId = questionId
  }

    public QuestionId: string;
    public AnswerId: string
}
