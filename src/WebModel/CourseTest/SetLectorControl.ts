export default class SetLectorControl {
    public isTrue: boolean;
    public questionId: string;
    public userAccessToken: string;
    public score: Number;
    public studentTestResultId: string;
    constructor (isTrue: boolean, questionId: string, userAccessToken: string, score: Number, studentTestResultId: string) {
      this.isTrue = isTrue
      this.questionId = questionId
      this.score = score
      this.studentTestResultId = studentTestResultId
      this.userAccessToken = userAccessToken
    }
}
