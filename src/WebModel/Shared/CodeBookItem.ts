export class CodeBookItem {
    public id: string;
    public name: string;
    public isDefault: boolean;
    public systemIdentificator: string;
    public disabled: boolean;

    constructor (id: string, name: string, isDefault: boolean, systemIdentificator: string, disabled: boolean) {
      this.id = id
      this.name = name
      this.isDefault = isDefault
      this.systemIdentificator = systemIdentificator
      this.disabled = disabled
    }
}
