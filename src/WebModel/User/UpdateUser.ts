import { Person } from '../Shared/Person'
export class UpdateUser {
    public Id: string;
    public UserAccessToken: string;
    public Person: Person;

    constructor (id: string, userAccessToken: string, person: Person) {
      this.Id = id
      this.UserAccessToken = userAccessToken
      this.Person = person
    }
}
