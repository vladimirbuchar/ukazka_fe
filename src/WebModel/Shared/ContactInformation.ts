export class ContactInformation {
  constructor (email: string, phoneNumber: string, www: string) {
    this.Email = email
    this.PhoneNumber = phoneNumber
    this.WWW = www
  }

    public Email: string;
    public PhoneNumber: string;
    public WWW: string;
}
