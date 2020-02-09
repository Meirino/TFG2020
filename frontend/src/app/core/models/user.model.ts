export class User {
  username: string;
  password: string;
  email: string;
  id: string;

  constructor(user: string, email, id) {
    (this.username = user), (this.email = email), (this.id = id);
  }
}
