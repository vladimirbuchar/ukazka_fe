export class UpdateAnswer {
    public Id: string;
    public Answer: string;
    public IsTrueAnswer: boolean;
    public UserAccessToken: string;
    public AnswerMode: string;
    constructor (id: string, answer: string, isTrueAnswer: boolean, userAccessToken: string, answerMode: string) {
      this.Id = id
      this.Answer = answer
      this.IsTrueAnswer = isTrueAnswer
      this.UserAccessToken = userAccessToken
      this.AnswerMode = answerMode
    }
}
