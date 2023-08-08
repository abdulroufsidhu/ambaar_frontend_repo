import axios from "axios";
import { Constants } from "../Constants";
import { Person } from "./person";

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
    axios
      .get<IUser>(`/users/get?email=${email}&password=${password}`, {
        baseURL: Constants.baseUrl,
      })
      .then((resposne) => (User.instance = resposne.data));

  static signup = (person: Person, password: string) =>
    axios
      .post<IUser>(`/users/create`, { person: person, password: password })
      .then((respose) => (User.instance = respose.data));

  static logout = () => (User.instance = undefined);
}
