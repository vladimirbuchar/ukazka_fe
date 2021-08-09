export default class SaveOrganizationSetting {
    public userAccessToken: string;
    public organizationId: string;
    public licenseId: string;
    public userDefaultPassword: string;
    public defaultCulture:string;
    public urlElearning: string;
    public registration: boolean;
    public googleLogin: boolean;
    public facebookLogin: boolean;
    public passwordReset: boolean;
    public lessonLength: Number;
    public BackgroundColor: string;
    public TextColor: string;

    public UseCustomSmtpServer:boolean;
    public SmtpServerUrl: string;
    public SmtpServerUserName: string;
    public SmtpServerPassword: string;
    public SmtpServerPort: string;
    public GoogleApiToken: string;

    constructor (userAccessToken: string, organizationId: string, licenseId: string, userDefaultPassword: string, defaultCulture:string, urlElearning: string,
      registration: boolean, googleLogin: boolean, facebookLogin: boolean, passwordReset: boolean, lessonLength: Number, backgroundColor: string, textColor: string,
      useCustomSmtpServer:boolean, smtpServerUrl: string, smtpServerPassword: string, smtpServerUserName:string, smtpServerPort:string, googleApiToken: string
    ) {
      this.licenseId = licenseId
      this.organizationId = organizationId
      this.userAccessToken = userAccessToken
      this.userDefaultPassword = userDefaultPassword
      this.defaultCulture = defaultCulture
      this.urlElearning = urlElearning
      this.registration = registration
      this.googleLogin = googleLogin
      this.facebookLogin = facebookLogin
      this.passwordReset = passwordReset
      this.lessonLength = Number(lessonLength)
      this.TextColor = textColor
      this.BackgroundColor = backgroundColor
      this.UseCustomSmtpServer = useCustomSmtpServer
      this.SmtpServerPassword = smtpServerPassword
      this.SmtpServerPort = smtpServerPort
      this.SmtpServerUrl = smtpServerUrl
      this.SmtpServerUserName = smtpServerUserName
      this.GoogleApiToken = googleApiToken
    }
}
