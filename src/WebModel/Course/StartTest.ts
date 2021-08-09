export default class StartTest {
    public CourseLessonId: string;
    public UserAccessToken: string;
    public CourseId : string;
    constructor (courseLessonId: string, userAccessToken: string, courseId : string) {
      this.CourseLessonId = courseLessonId
      this.UserAccessToken = userAccessToken
      this.CourseId = courseId
    }
}
