export class UpdateChatItem {
    public UserAccessToken: string;
    public Id: string;
    public Text: string;

    constructor (id: string, userAccessToken: string, text:string) {
      this.Id = id
      this.UserAccessToken = userAccessToken
      this.Text = text
    }
}
