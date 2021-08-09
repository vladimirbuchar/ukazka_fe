export class UpdateUserInOrganizationRole {
    public UserId: string;
    public OrganizationRoleId: string[];
    public UserAccessToken: string;
    public OrganizationId: string;
    constructor (id: string, organizationRoleId: string[], userAccessToken: string, organizationId: string) {
      this.UserId = id
      this.OrganizationRoleId = organizationRoleId
      this.UserAccessToken = userAccessToken
      this.OrganizationId = organizationId
    }
}
