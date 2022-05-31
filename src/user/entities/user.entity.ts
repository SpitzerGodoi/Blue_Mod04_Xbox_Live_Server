export class User {
  id?: string;
  nickname: string;
  email: string;
  password: string;
  cpf: number;
  isAdmin: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
