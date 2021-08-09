export class AddStudentToGroup {
    public UserEmail: string;
    public StudentGroupId: string;
    public UserAccessToken: string;
    public ClientCulture:string;
    public FirstName: string;
    public LastName: string;

    constructor (userEmail: string, studentGroupId: string, userAccessToken: string, clientCulture:string, firstName: string, lastName:string) {
      this.UserEmail = userEmail
      this.StudentGroupId = studentGroupId
      this.UserAccessToken = userAccessToken
      this.ClientCulture = clientCulture
      this.FirstName = firstName
      this.LastName = lastName
    }
}
