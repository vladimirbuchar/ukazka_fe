export class AddStudentToCourseTerm {
    public UserEmail: string;
    public CourseTermId: string;
    public UserAccessToken: string;
    public ClientCulture:string;
    public FirstName: string;
    public LastName: string;

    constructor (userEmail: string, courseTermId: string, userAccessToken: string, clientCulture:string, firstName: string, lastName:string) {
      this.UserEmail = userEmail
      this.CourseTermId = courseTermId
      this.UserAccessToken = userAccessToken
      this.ClientCulture = clientCulture
      this.FirstName = firstName
      this.LastName = lastName
    }
}
