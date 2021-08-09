export class AddSendMesage {
    public OrganizationId: string;
    public UserAccessToken: string;
    public Name: string;
    public Html: string;
    public SendMessageType: string;
    public Reply: string;
    constructor (organizationId: string, userAccessToken: string, name: string, html: string, sendMessageType: string, reply:string) {
      this.OrganizationId = organizationId
      this.UserAccessToken = userAccessToken
      this.Html = html
      this.Name = name
      this.SendMessageType = sendMessageType
      this.Reply = reply
    }
}
