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

  static getInstance = () => {
    if (!User.instance) {
      const u = sessionStorage.getItem("user");
      if (u) {
        User.instance = JSON.parse(u) as IUser;
        if (User.instance) {
          Employee.list({ user: User.instance })
            .then((jobs) => {
              if (User.instance) {
                User.instance.jobs = jobs ?? [];
                console.log("ReSetting Session", User.instance);
                sessionStorage.setItem("user", JSON.stringify(User.instance));
              }
            })
            .catch((error) => console.error(error));
        }
      }
      console.table(User.instance);
    }
    return User.instance;
  };

  private constructor(user: IUser) {
    User.instance = user;
  }

  static login = async (email: string, password: string) =>
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
        Employee.list({ user: User.instance })
          .then((list) => {
            User.instance!.jobs = list ?? [];
            sessionStorage.setItem("user", JSON.stringify(User.instance));
            return User.instance;
          })
          .catch((error) => {
            console.error(error);
            return User.instance;
          })
      );
    });

  static signup = async (person: IPerson, password: string) =>
    axios
      .post<IUser>(ServerUrls.auth.signup, {
        person: person,
        password: password,
      })
      .then((respose) => (User.instance = respose.data));

  static logout = async () =>
    new Promise<IUser | undefined>((resolve, reject) => {
      sessionStorage.removeItem("user");
      User.instance = undefined;
      return resolve(undefined);
      reject();
    });

  static addJob = (job: IEmployee) => {
    if (User.instance) {
      const previousJobs = User.instance.jobs ?? [];
      User.instance.jobs = [...previousJobs, job];
      sessionStorage.setItem("user", JSON.stringify(User.instance));
    }
  };
}
