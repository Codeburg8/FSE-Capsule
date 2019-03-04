export class User {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public sso: string;

    constructor(id: string, fName: string, lName: string, email: string, sso: string) {
      this.id = id;
      this.firstName = fName;
      this.lastName = lName;
      this.email = email;
      this.sso = sso;
    }
}
