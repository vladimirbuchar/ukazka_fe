import { ThumbDown } from '@material-ui/icons'

export class UpdateSendMessage {
    public Id: string;
    public UserAccessToken: string;
    public Name: string;
    public Html: string;
    public OrganizationId: string;
    public SendMessageType: string;
    public Reply: string;
    constructor (id: string, userAccessToken: string, name: string, html: string, organizationId: string, sendMessageType: string, reply:string) {
      this.Id = id
      this.UserAccessToken = userAccessToken
      this.Html = html
      this.Name = name
      this.OrganizationId = organizationId
      this.SendMessageType = sendMessageType
      this.Reply = reply
    }
}
