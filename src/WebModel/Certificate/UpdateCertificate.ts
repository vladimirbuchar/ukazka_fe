import { ThumbDown } from '@material-ui/icons'

export class UpdateCertificate {
    public Id: string;
    public UserAccessToken: string;
    public Name: string;
    public Html: string;
    public OrganizationId: string;
    public CertificateValidTo: Number;
    constructor (id: string, userAccessToken: string, name: string, html: string, organizationId: string, certificateValidTo: Number) {
      this.Id = id
      this.UserAccessToken = userAccessToken
      this.Html = html
      this.Name = name
      this.OrganizationId = organizationId
      this.CertificateValidTo = Number(certificateValidTo)
    }
}
