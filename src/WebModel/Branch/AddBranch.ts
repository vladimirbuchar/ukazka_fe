import { ContactInformation } from '../Shared/ContactInformation'
import { Address } from '../Shared/Address'

export class AddBranch {
    public ContactInformation: ContactInformation;
    public Address: Address;
    public IsMainBranch: boolean;
    public UserAccessToken: string;
    public Name: string;
    public Description: string;
    public OrganizationId: string;
    constructor (contactInformation: ContactInformation, address: Address, isMainBranch: boolean, userAccessToken: string, name: string, description: string, organizationId: string) {
      this.ContactInformation = contactInformation
      this.Address = address
      this.IsMainBranch = isMainBranch
      this.UserAccessToken = userAccessToken
      this.Name = name
      this.Description = description
      this.OrganizationId = organizationId
    }
}
