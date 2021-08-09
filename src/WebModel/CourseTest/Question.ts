import Answer from './Answer'

export default class Question {
    public id: string;
    public answerMode: string;
    public question: string;
    public answers: Answer[];
    public questionMode: string;
    public filePath: string;
    constructor (id: string, answerMode:string, question:string, answers: Answer[], questionMode: string, filePath: string) {
      this.id = id
      this.answerMode = answerMode
      this.answers = answers
      this.question = question
      this.questionMode = questionMode
      this.filePath = filePath
    }
}
