export class Document {
    public id: string;
    public num: string;
    public fileName: string;
    public ref: string;
    public type: string;
    public desc: string;

    constructor(
      id: string, num: string,
      fileName: string, type: string, ref: string,
      desc: string
      ) {

      this.id = id;
      this.num = num;
      this.fileName = fileName;
      this.ref = ref;
      this.type = type;
      this.desc = desc;
    }
}
