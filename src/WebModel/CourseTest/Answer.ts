export default class Answer {
    public answer: string;
    public id: string;
    public filePath: string ;
    constructor (answer:string, id: string, filePath: string) {
      this.answer = answer
      this.id = id
      this.filePath = filePath
    }
}
