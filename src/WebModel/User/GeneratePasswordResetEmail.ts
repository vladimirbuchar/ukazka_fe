export default class GeneratePasswordResetEmail {
    public userEmail: string;
    public clientCulture: string;
    constructor (userEmail: string, clientCulture: string) {
      this.userEmail = userEmail
      this.clientCulture = clientCulture
    }
}
