import axios from "axios";
import { IPerson } from "./person";
import { ServerUrls } from "../routes";
import { Employee, IEmployee } from "./employee";
import { MyApiResponse } from "../unified-response";
import { IBranch } from "./branch";
import { Permission } from "./permission";
import { SessionStorageManager } from "../utils/session-storage";

export interface IUser {
  _id?: string;
  person?: IPerson;
  jobs?: IEmployee[];
  token?: string;
  performingJob?: IEmployee;
}

export class User {
  private static instance?: IUser;
  private static calling?: boolean = false;

  static getInstance: () => IUser = () => {
    if (!User.instance) {
      if (!User.calling) {
        User.calling = true;
        const u = SessionStorageManager.getItem<IUser>("user");
        if (u) {
          User.postLoginProcess(u)
            ?.then()
            .catch((err) => console.error("User getInstance", err));
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
    axios
      .get<MyApiResponse<IUser>>(ServerUrls.auth.login, {
        params: {
          email,
          password,
        },
      })
      .then((res) => this.postLoginProcess(res.data.data));

  private static postLoginProcess = (user?: IUser) => {
    User.instance = user;
    console.info("signed up user", user);
    return !!User.instance && !User.instance.jobs
      ? Employee.list({ user: User.instance })
          .then((jobs) => {
            console.info(jobs);
            User.instance!.jobs = jobs ?? [];
            SessionStorageManager.setItem("user", User.instance);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            Permission.fetchAll()
              .then((permissions) =>
                SessionStorageManager.setItem("permissions", permissions)
              )
              .catch((error) => console.error(error));
            User.calling = false;
            return User.instance;
          })
          .catch((error) => {
            console.error(error);
            User.calling = false;
            return User.instance;
          })
      : undefined;
  };

  static signup = async (
    person: IPerson,
    password: string,
    autoLogin = false
  ) =>
    axios
      .post<MyApiResponse<IUser>>(ServerUrls.auth.signup, {
        person: person,
        password: password,
      })
      .then((res) =>
        autoLogin
          ? this.postLoginProcess(res.data.data)
          : new Promise<IUser | undefined>((resolve, rej) => {
              resolve(res.data.data);
            })
      );

  static logout = async () =>
    new Promise<IUser | undefined>((resolve, reject) => {
      SessionStorageManager.removeItem("user", "permissions");
      User.instance = undefined;
      return resolve(undefined);
      reject();
    });

  static addJob = (job: IEmployee) => {
    if (User.instance) {
      const previousJobs = User.instance.jobs ?? [];
      User.instance.jobs = [...previousJobs, job];
      SessionStorageManager.setItem("user", User.instance);
    }
  };

  static removeJob = (filter: (job: IEmployee) => boolean) => {
    if (User.instance) {
      const previousJobs = User.instance.jobs ?? [];
      User.instance.jobs = previousJobs.filter(filter);
      SessionStorageManager.setItem("user", User.instance);
    }
  };

  static updateJob = (job: IEmployee) => {
    if (User.instance) {
      const previousJobs = User.instance.jobs ?? [];
      User.instance.jobs = previousJobs.map((j) =>
        j._id === job._id ? job : j
      );
      SessionStorageManager.setItem("user", User.instance);
    }
  };

  static clearPerformingJob = () => {
    if (User.instance) {
      User.instance.performingJob = undefined;
    }
  };

  static setPerformingJob = (branch: IBranch) => {
    if (User.instance) {
      User.instance.performingJob = User.instance?.jobs
        ?.filter((j) => j.branch?._id === branch._id)
        ?.at(0);
      console.log("setting permforming job", User.instance.performingJob);
    }
  };

  static changePassword = (old: string, changed: string) => {
    axios
      .patch(ServerUrls.auth.ChangePassword, {
        old_password: old,
        new_password: changed,
      })
      .then((d) => console.info("password changed", d))
      .catch((e) => console.error(e));
    // call change password api with endpoint /change-password
  };
}
