export class AddCourseLesson {
    public Name: string;
    public Description: string;
    public MaterialId: string;
    public UserAccessToken: string;
    public Type: string;
    constructor (name: string, description: string, materialId: string, userAccessToken: string, type: string) {
      this.MaterialId = materialId
      this.Description = description
      this.Name = name
      this.UserAccessToken = userAccessToken
      this.Type = type
    }
}
