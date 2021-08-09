export class UpdateStudyHour {
    public OrganizationId:string
    public ActiveFromId: string
    public ActiveToId :string
    public Position :Number
    public UserAccessToken :string
    public Id: string;
    constructor (id: string, organizationId:string, activeFromId:string, activeToId:string, position:Number, userAccessToken :string) {
      this.OrganizationId = organizationId
      this.ActiveFromId = activeFromId
      this.ActiveToId = activeToId
      this.Position = position
      this.UserAccessToken = userAccessToken
      this.Id = id
    }
}
