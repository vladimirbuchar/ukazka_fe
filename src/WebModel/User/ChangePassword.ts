export class ChangePassword {
    public UserId: string;
    public OldUserPassword: string;
    public NewUserPassword: string;
    public NewUserPassword2: string;
    public UserAccessToken: string;
    constructor (userId: string, oldUserPassword: string, newUserPassword: string, newUserPassword2: string, userAccessToken: string) {
      this.UserId = userId
      this.UserAccessToken = userAccessToken
      this.OldUserPassword = oldUserPassword
      this.NewUserPassword2 = newUserPassword2
      this.NewUserPassword = newUserPassword
    }
}
