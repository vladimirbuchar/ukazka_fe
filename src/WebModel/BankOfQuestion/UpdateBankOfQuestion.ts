export class UpdateBankOfQuestion {
    public Name: string;
    public Description: string;
    public BankOfQuestionId: string;
    public UserAccessToken: string;
    constructor (bankOfQuestionId: string, name: string, description: string, userAccessToken: string) {
      this.BankOfQuestionId = bankOfQuestionId
      this.Description = description
      this.Name = name
      this.UserAccessToken = userAccessToken
    }
}
