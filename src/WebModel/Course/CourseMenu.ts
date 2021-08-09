export default class CourseMenu {
    public id: string;
    public name: string;
    public type: string;
    public items: CourseMenu[];
    constructor (id: string, name: string, type: string, items: CourseMenu[]) {
      this.id = id
      this.items = items
      this.name = name
      this.type = type
    }
}
