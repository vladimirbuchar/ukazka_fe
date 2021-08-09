export class UpdateQuestion {
    public Question: string;
    public AnswerModeId: string;
    public Id: string;
    public UserAccessToken: string;
    public BankOfQUestionId: string;
    public QuestionModeId: string;
    constructor (id: string, answerModeId: string, question: string, userAccessToken: string, bankOfQUestionId: string, questionModeId: string) {
      this.Question = question
      this.AnswerModeId = answerModeId
      this.Id = id
      this.UserAccessToken = userAccessToken
      this.BankOfQUestionId = bankOfQUestionId
      this.QuestionModeId = questionModeId
    }
}
