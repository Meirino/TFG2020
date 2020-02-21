export class User {
  username: string;
  password: string;
  email: string;
  id: number;
  avatarUrl: string;

  constructor(user: string, email: string, avatar: string, id: number) {
    (this.username = user), (this.email = email), (this.id = id), (this.avatarUrl = avatar);
  }
}
