export class AddBankOfQuestion {
    public Name: string;
    public Description: string;
    public OrganizationId: string;
    public UserAccessToken: string;
    constructor (name: string, description: string, organizationId: string, userAccessToken: string) {
      this.OrganizationId = organizationId
      this.Description = description
      this.Name = name
      this.UserAccessToken = userAccessToken
    }
}
