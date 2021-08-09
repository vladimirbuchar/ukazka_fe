export class AddCourseTest {
    public Name: string;
    public Description: string;
    public MaterialId: string;
    public UserAccessToken: string;
    public Type: string;
    public IsRandomGenerateQuestion: boolean;
    public QuestionCountInTest: number;
    public TimeLimit: number;
    public DesiredSuccess: number;
    public BankOfQuestion: [];
    public MaxRepetition:number;
    constructor (name: string, description: string, materialId: string, userAccessToken: string, type: string,
      isRandomGenerateQuestion: boolean, questionCountInTest: number, timeLimit: number, desiredSuccess: number, bankOfQuestion: [], maxRepetition:number) {
      this.MaterialId = materialId
      this.Description = description
      this.Name = name
      this.UserAccessToken = userAccessToken
      this.Type = type
      this.IsRandomGenerateQuestion = isRandomGenerateQuestion
      this.QuestionCountInTest = Number(questionCountInTest)
      this.TimeLimit = Number(timeLimit)
      this.DesiredSuccess = Number(desiredSuccess)
      this.BankOfQuestion = bankOfQuestion
      this.MaxRepetition = Number(maxRepetition)
    }
}
