export default class SelectItem {
    public Name: string;
    public Id: string;
    public Data: []
    constructor (id: string, name: string, data:any = null) {
      this.Id = id
      this.Name = name
      this.Data = data
    }
}
