export class ClassRoomAdd {
  public floor: number;
  public maxCapacity: number;
  public name: string;
  public description: string;
  public userAccessToken: string;
  public branchId: string;

  constructor (floor: number, maxCapacity: number, name: string, description: string, userAccessToken: string, branchId: string) {
    this.floor = Number(floor)
    this.maxCapacity = Number(maxCapacity)
    this.name = name
    this.description = description
    this.userAccessToken = userAccessToken
    this.branchId = branchId
  }
}
