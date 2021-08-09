export class StudentEvaluationAdd {
  public evaluation: string;
  public userInOrganizationId: string;
  public courseTermId: string;
  public userAccessToken: string;

  constructor (evaluation: string, userInOrganizationId: string, courseTermId: string, userAccessToken: string) {
    this.evaluation = evaluation
    this.userInOrganizationId = userInOrganizationId
    this.courseTermId = courseTermId
    this.userAccessToken = userAccessToken
  }
}
