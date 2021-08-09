import { AddOrganization } from '../Organization/AddOrganization'
import { Person } from '../Shared/Person'

export default class AddUser {
    public userPassword: string;
    public userPassword2: string;
    public userEmail: string;
    public person: Person;
    public clientCulture: string;
    public createNewOrganization: boolean;
    public organization: AddOrganization|null;
    public organizationId: string;

    constructor (userPassword: string, userPassword2: string, userEmail: string, person: Person, clientCulture: string, createNewOrganization: boolean, organization: AddOrganization|null, organizationId: string) {
      this.person = person
      this.userEmail = userEmail
      this.userPassword = userPassword
      this.userPassword2 = userPassword2
      this.clientCulture = clientCulture
      this.createNewOrganization = createNewOrganization
      this.organization = organization
      this.organizationId = organizationId
    }
}
