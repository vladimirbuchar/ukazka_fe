import { Address } from './Address'

export class Person {
    public FirstName: string;
    public SecondName: string;
    public LastName: string;
    public Address: Address[];

    constructor (firstName: string, secondName: string, lastName: string, address: Address[]) {
      this.FirstName = firstName
      this.SecondName = secondName
      this.LastName = lastName
      this.Address = address
    }
}
