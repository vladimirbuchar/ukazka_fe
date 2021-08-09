export class AddStudyHour {
    public OrganizationId:string
    public ActiveFromId: string
    public ActiveToId :string
    public Position :Number
    public UserAccessToken :string
    public LessonLength:Number;
    constructor (organizationId:string, activeFromId:string, activeToId:string, position:Number, userAccessToken :string, lessonLength:Number) {
      this.OrganizationId = organizationId
      this.ActiveFromId = activeFromId
      this.ActiveToId = activeToId
      this.Position = position
      this.UserAccessToken = userAccessToken
      this.LessonLength = Number(lessonLength)
    }
}
