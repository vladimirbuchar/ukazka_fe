export class UpdateCourseLesson {
    public Name: string;
    public Description: string;
    public Id: string;
    public UserAccessToken: string;
    constructor (id: string, name: string, description: string, userAccessToken: string) {
      this.Id = id
      this.Description = description
      this.Name = name
      this.UserAccessToken = userAccessToken
    }
}
