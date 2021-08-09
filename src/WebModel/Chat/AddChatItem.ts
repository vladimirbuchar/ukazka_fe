export class AddChatItem {
    public UserAccessToken: string;
    public UserId: string;
    public CourseTermId: string;
    public ParentId: string|null;
    public Text: string;

    constructor (userId: string, courseTermId: string, parentId: string, userAccessToken: string, text:string) {
      this.UserId = userId
      this.CourseTermId = courseTermId
      this.ParentId = parentId
      this.UserAccessToken = userAccessToken
      this.Text = text
    }
}
