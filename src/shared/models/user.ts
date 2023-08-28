import axios from "axios";
import { IPerson } from "./person";
import { ServerUrls } from "../routes";
import { Employee, IEmployee } from "./employee";
import { MyApiResponse } from "../unified-response";

export interface IUser {
  _id?: string;
  person?: IPerson;
  jobs?: IEmployee[];
  token?: string;
}

export class User {
  private static instance?: IUser;
  private static calling?: boolean = false;

  static getInstance: () => IUser = () => {
    if (!User.instance) {
      if (!User.calling) {
        User.calling = true;
        const u = sessionStorage.getItem("user");
        if (u) {
          User.instance = JSON.parse(u) as IUser;
          if (User.instance) {
            Employee.list({ user: User.instance })
              .then((jobs) => {
                if (User.instance) {
                  console.info(jobs)
                  User.instance.jobs = jobs ?? [];
                  console.log("ReSetting Session", User.instance);
                  sessionStorage.setItem("user", JSON.stringify(User.instance));
                  User.calling = false;
                }
              })
              .catch((error) => {
                console.error(error);
                User.calling = false;
              });
          }
        }
      }
    }
    if (!User.instance)
      setTimeout(() => {
        this.getInstance();
      }, 1000);
    return User.instance!;
  };

  private constructor(user: IUser) {
    User.instance = user;
  }

  static login = async (email: string, password: string) =>
    axios.get<MyApiResponse<IUser>>(ServerUrls.auth.login, {
      params: {
        email,
        password,
      },
    }).then((res) => {
      User.instance = res.data.data;
      return (
        User.instance ?
          Employee.list({ user: User.instance })
            .then((jobs) => {
              console.info(jobs)
              User.instance!.jobs = jobs ?? [];
              sessionStorage.setItem("user", JSON.stringify(User.instance));
              return User.instance;
            })
            .catch((error) => {
              console.error(error);
              return User.instance;
            })
          : undefined
      );
    });

  static signup = async (person: IPerson, password: string) =>
    axios
      .post<MyApiResponse<IUser>>(ServerUrls.auth.signup, {
        person: person,
        password: password,
      })
      .then((respose) => (User.instance = respose.data.data));

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

  static removeJob = (filter: (job: IEmployee) => boolean) => {
    if (User.instance) {
      const previousJobs = User.instance.jobs ?? [];
      User.instance.jobs = previousJobs.filter(filter);
      sessionStorage.setItem("user", JSON.stringify(User.instance));
    }
  };

  static updateJob = (job: IEmployee) => {
    if (User.instance) {
      const previousJobs = User.instance.jobs ?? [];
      User.instance.jobs = previousJobs.map((j) =>
        j._id === job._id ? job : j
      );
      sessionStorage.setItem("user", JSON.stringify(User.instance));
    }
  };
}
