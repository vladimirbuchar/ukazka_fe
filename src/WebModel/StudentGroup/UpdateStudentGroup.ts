import { ThumbDown } from '@material-ui/icons'

export class UpdateStudentGroup {
    public Id: string;
    public UserAccessToken: string;
    public Name: string;

    constructor (id: string, userAccessToken: string, name: string) {
      this.Id = id
      this.UserAccessToken = userAccessToken
      this.Name = name
    }
}
