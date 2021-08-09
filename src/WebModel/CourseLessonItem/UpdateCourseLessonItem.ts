export class UpdateCourseLessonItem {
    public Name: string;
    public Description: string;
    public CourseLessonItemId: string;
    public UserAccessToken: string;
    public TemplateId: string;
    public Html: string;
    public Youtube: string;
    constructor (id: string, name: string, description: string, userAccessToken: string, templateId: string, html: string, youtube:string) {
      this.CourseLessonItemId = id
      this.Description = description
      this.Name = name
      this.UserAccessToken = userAccessToken
      this.TemplateId = templateId
      this.Html = html
      this.Youtube = youtube
    }
}
