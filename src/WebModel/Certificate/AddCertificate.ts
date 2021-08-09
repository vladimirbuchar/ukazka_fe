import { ThumbDown } from '@material-ui/icons'

export class AddCertificate {
    public OrganizationId: string;
    public UserAccessToken: string;
    public Name: string;
    public Html: string;
    public CertificateValidTo: Number;
    constructor (organizationId: string, userAccessToken: string, name: string, html: string, certificateValidTo: Number) {
      this.OrganizationId = organizationId
      this.UserAccessToken = userAccessToken
      this.Html = html
      this.Name = name
      this.CertificateValidTo = Number(certificateValidTo)
    }
}
