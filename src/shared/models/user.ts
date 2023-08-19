import axios from "axios";
import { IPerson } from "./person";
import { ServerUrls } from "../constants";
import { Employee, IEmployee } from "./employee";

export interface IUser {
  _id?: string;
  person?: IPerson;
  jobs?: IEmployee[];
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
    }).then((resposne) => {
      User.instance = resposne.data;
      return (
        !!User.instance &&
        Employee.list({ user: User.instance._id })
          .then((list) => {
            User.instance!.jobs = list ?? [];
            return User.instance;
          })
          .catch((error) => {
            console.error(error);
            return User.instance;
          })
      );
    });

  static signup = (person: IPerson, password: string) =>
    axios
      .post<IUser>(ServerUrls.auth.signup, {
        person: person,
        password: password,
      })
      .then((respose) => (User.instance = respose.data));

  static logout = () =>
    new Promise<IUser | undefined>((resolve, reject) => {
      User.instance = undefined;
      return resolve(undefined);
      reject();
    });
}
