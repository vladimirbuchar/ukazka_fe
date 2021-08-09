export class UpdateCourseTest {
    public Name: string;
    public Description: string;
    public Id: string;
    public UserAccessToken: string;
    public IsRandomGenerateQuestion: boolean;
    public QuestionCountInTest: number;
    public TimeLimit: number;
    public DesiredSuccess: number;
    public BankOfQuestion: [];
    public MaxRepetition: number
    constructor (id: string, name: string, description: string, userAccessToken: string, isRandomGenerateQuestion: boolean, questionCountInTest: number, timeLimit: number, desiredSuccess: number, bankOfQuestion: [], maxRepetition:number) {
      this.Id = id
      this.Description = description
      this.Name = name
      this.UserAccessToken = userAccessToken
      this.IsRandomGenerateQuestion = isRandomGenerateQuestion
      this.QuestionCountInTest = Number(questionCountInTest)
      this.TimeLimit = Number(timeLimit)
      this.DesiredSuccess = Number(desiredSuccess)
      this.BankOfQuestion = bankOfQuestion
      this.MaxRepetition = Number(maxRepetition)
    }
}
