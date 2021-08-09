import { ContactInformation } from '../Shared/ContactInformation'
import { Address } from '../Shared/Address'

export class UpdateOrganization {
  constructor (id: string, contactInformation: ContactInformation, addresses: Address[], canSendCourseInquiry: boolean, userAccessToken: string, name: string, description: string) {
    this.ContactInformation = contactInformation
    this.Addresses = addresses
    this.CanSendCourseInquiry = canSendCourseInquiry
    this.UserAccessToken = userAccessToken
    this.Name = name
    this.Description = description
    this.Id = id
  }

    public ContactInformation: ContactInformation
    public Addresses: Address[]
    public CanSendCourseInquiry: boolean
    public UserAccessToken: string
    public Name: string
    public Description: string
    public Id: string;
}
