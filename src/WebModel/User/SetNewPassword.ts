export default class SetNewPassword {
    public linkId: string;
    public password1: string;
    public password2: string;
    constructor (linkId: string, password1: string, password2: string) {
      this.linkId = linkId
      this.password1 = password1
      this.password2 = password2
    }
}
