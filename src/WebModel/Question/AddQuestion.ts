export class AddQuestion {
    public Question: string;
    public AnswerModeId: string;
    public BankOfQUestionId: string;
    public UserAccessToken: string;
    public Validate: boolean;
    public QuestionModeId: string;
    constructor (bankOfQUestionId: string, answerModeId: string, question: string, userAccessToken: string, validate: boolean, questionModeId: string) {
      this.Question = question
      this.AnswerModeId = answerModeId
      this.BankOfQUestionId = bankOfQUestionId
      this.UserAccessToken = userAccessToken
      this.Validate = validate
      this.QuestionModeId = questionModeId
    }
}
