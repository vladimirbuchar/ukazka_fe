export default class EvaluateQuestion {
    public QuestionId: string;
    public AnswerId: string[];
    public TextAnswer: string;
    public TextManualAnswer: string;
    constructor (questionId: string, answerId: string[], textAnswer: string, textManualAnswer:string) {
      this.AnswerId = answerId
      this.QuestionId = questionId
      this.TextAnswer = textAnswer
      this.TextManualAnswer = textManualAnswer
    }
}
