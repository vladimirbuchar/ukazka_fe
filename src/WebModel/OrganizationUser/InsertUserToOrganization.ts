export class InsertUserToOrganization {
    public UserEmails: string[];
    public OrganizationId: string;
    public OrganizationRoleId: string[];
    public UserAccessToken: string;
    public ClientCulture:string;
    constructor (userEmails: string[], organizationId: string, organizationRoleId: string[], userAccessToken: string, clientCulture:string) {
      this.OrganizationId = organizationId
      this.OrganizationRoleId = organizationRoleId
      this.UserAccessToken = userAccessToken
      this.UserEmails = userEmails
      this.ClientCulture = clientCulture
    }
}
