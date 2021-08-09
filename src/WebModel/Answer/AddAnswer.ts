export class AddAnswer {
    public QuestionId: string;
    public Answer: string;
    public IsTrueAnswer: boolean;
    public UserAccessToken: string;
    public AnswerMode: string;
    constructor (questionId: string, answer: string, isTrueAnswer: boolean, userAccessToken: string, answerMode: string) {
      this.QuestionId = questionId
      this.Answer = answer
      this.IsTrueAnswer = isTrueAnswer
      this.UserAccessToken = userAccessToken
      this.AnswerMode = answerMode
    }
}
