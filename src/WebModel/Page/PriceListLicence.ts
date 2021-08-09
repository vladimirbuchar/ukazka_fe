export default class PriceListLicence {
    public name: string;
    public mounthPrice: Number;
    public maximumBranch: Number;
    public maximumCourse: Number;
    public maximumUser: Number;
    public id: string;
    constructor (name: string, mounthPrice: Number, maximumBranch: Number, maximumCourse: Number, maximumUser: Number, id:string) {
      this.name = name
      this.mounthPrice = mounthPrice
      this.maximumUser = maximumUser
      this.maximumCourse = maximumCourse
      this.maximumBranch = maximumBranch
      this.id = id
    }
}
