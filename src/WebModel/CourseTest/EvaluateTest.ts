import EvaluateQuestion from './EvaluateQuestion'

export default class EvaluateTest {
    public UserTestSummaryId: string;
    public UserAccessToken: string;
    public EvaluateQuestions: EvaluateQuestion[];
    public CourseLessonId: string;
    constructor (userTestSummaryId: string, userAccessToken: string, evaluateQuestions: EvaluateQuestion[], courseLessonId: string) {
      this.CourseLessonId = courseLessonId
      this.EvaluateQuestions = evaluateQuestions
      this.UserAccessToken = userAccessToken
      this.UserTestSummaryId = userTestSummaryId
    }
}
