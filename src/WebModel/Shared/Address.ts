export class Address {
  constructor (countryId: string, region: string, city: string, street: string, houseNumber: string, zipCode: string, addressTypeId: string, countryName: string) {
    this.countryId = countryId
    this.region = region
    this.city = city
    this.street = street
    this.houseNumber = houseNumber
    this.zipCode = zipCode
    this.addressTypeId = addressTypeId
    this.countryName = countryName
  }

    public countryId: string;
    public region: string
    public city: string;
    public street: string;
    public houseNumber: string;
    public zipCode: string;
    public addressTypeId: string;
    public countryName: string;
}
