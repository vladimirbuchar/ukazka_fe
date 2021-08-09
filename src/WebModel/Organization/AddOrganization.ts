import { ContactInformation } from './../Shared/ContactInformation'
import { Address } from './../Shared/Address'
export class AddOrganization {
  constructor (contactInformation: ContactInformation, addresses: Address[], canSendCourseInquiry: boolean, userAccessToken: string, name: string, description: string, defaultCulture: string) {
    this.ContactInformation = contactInformation
    this.Addresses = addresses
    this.CanSendCourseInquiry = canSendCourseInquiry
    this.UserAccessToken = userAccessToken
    this.Name = name
    this.Description = description
    this.DefaultCulture = defaultCulture
  }

    public ContactInformation: ContactInformation
    public Addresses: Address[]
    public CanSendCourseInquiry: boolean
    public UserAccessToken: string
    public Name: string
    public Description: string
    public DefaultCulture: string;
}
