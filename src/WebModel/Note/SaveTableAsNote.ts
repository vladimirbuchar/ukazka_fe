export class SaveTableAsNote {
    public UserAccessToken: string;
    public Img: string;
    public CourseLessonItem: string;

    constructor (userAccessToken: string, img: string, courseLessonItem: string) {
      this.UserAccessToken = userAccessToken
      this.Img = img
      this.CourseLessonItem = courseLessonItem
    }
}
