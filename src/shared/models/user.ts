import axios from "axios";
import { Person } from "./person";
import { ServerUrls } from "../constants";

interface IUser {
  _id?: string;
  person?: Person;
  password?: string;
}

export class User {
  private static instance?: IUser;

  static getInstance = () => User.instance;

  private constructor(user: IUser) {
    User.instance = user;
  }

  static login = (email: string, password: string) =>
    axios<IUser>({
      method: "get",
      url: ServerUrls.auth.login,
      params: {
        email,
        password,
      },
    }).then((resposne) => (User.instance = resposne.data));

  static signup = (person: Person, password: string) =>
    axios
      .post<IUser>(ServerUrls.auth.signup, {
        person: person,
        password: password,
      })
      .then((respose) => (User.instance = respose.data));

  static logout = () => (User.instance = undefined);
}
