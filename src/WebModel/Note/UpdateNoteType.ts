export class UpdateNoteType {
    public Text: string;
    public NoteId: string;
    public UserAccessToken: string;
    public NoteName: string;
    public Img: string;

    constructor (text: string, noteId: string, userAccessToken: string, noteName: string, img: string = '') {
      this.Text = text
      this.NoteId = noteId
      this.UserAccessToken = userAccessToken
      this.NoteName = noteName
      this.Img = img;
    }
}
