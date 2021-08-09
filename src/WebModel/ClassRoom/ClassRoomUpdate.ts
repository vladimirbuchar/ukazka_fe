export class ClassRoomUpdate {
    public floor: number;
    public maxCapacity: number;
    public name: string;
    public description: string;
    public userAccessToken: string;
    public id: string;

    constructor (floor: number, maxCapacity: number, name: string, description: string, userAccessToken: string, id: string) {
      this.floor = Number(floor)
      this.maxCapacity = Number(maxCapacity)
      this.name = name
      this.description = description
      this.userAccessToken = userAccessToken
      this.id = id
    }
}
