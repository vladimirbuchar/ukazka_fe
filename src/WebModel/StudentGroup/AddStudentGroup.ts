import { ThumbDown } from '@material-ui/icons'

export class AddStudentGroup {
    public OrganizationId: string;
    public UserAccessToken: string;
    public Name: string;

    constructor (organizationId: string, userAccessToken: string, name:string) {
      this.OrganizationId = organizationId
      this.UserAccessToken = userAccessToken
      this.Name = name
    }
}
