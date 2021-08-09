export class AddNoteType {
    public Text: string;
    public NoteType: string;
    public CourseLessonItem: string;
    public UserAccessToken: string;
    public NoteName: string;
    public Img: string;

    constructor (text: string, noteType: string, courseLessonItem: string, userAccessToken: string, noteName:string, img: string = '') {
      this.Text = text
      this.NoteType = noteType
      this.CourseLessonItem = courseLessonItem
      this.UserAccessToken = userAccessToken
      this.NoteName = noteName
      this.Img = img
    }
}
