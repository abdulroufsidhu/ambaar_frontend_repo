# Introduction
 Ambaar stands at the forefront of innovative solutions, redefining the landscape of inventory and business management. Designed with a singular focus on enhancing financial efficiency, Ambaar is more than just a system—it's a comprehensive tool crafted to streamline the complexities of managing businesses. With an unwavering commitment to excellence, Ambaar empowers organizations to take control of their finances, providing a robust platform that transforms how businesses approach inventory, transactions, and overall financial management. Join the evolution of business management with Ambaar and witness a new era of operational excellence and financial prowess.

## Quick Setup

**Pre Requisites**

- <a href="https://github.com/abdulroufsidhu/ambaar_backend_repo.git" target="_blank">Setup ambaar-backend-repo</a>

**Quick Start**

- run `npm i && npm run dev`

### Project Architecture
> I am no way expret architect and a bad documentor. But I must try my best. This architecture has a lot of room for improvement.
Please feel free to participate in the section of documentation or development.

```mermaid
---
title: Ambar Architecture
---
classDiagram 

  class Person {
    _id?: string;
    name?: string;
    username?: string;
    nationalId?: string;
    contact?: string;
    email?: string;

    static add (person: IPerson)
    static view (person: IPerson)
    static list (businessId: string)
  }

  class User {
    _id?: string;
    person?: IPerson;
    jobs?: IEmployee[];
    token?: string;
    performingJob?: IEmployee;

    private static instance?: IUser;
    private static calling?: boolean = false;

    static getInstance
    static async login(email: string, password: string)
    static postLoginProcess (user?: IUser) 
    static signup = async ( person: IPerson, password: string, autoLogin = false )
    static async logout ()
    static addJob (job: IEmployee)
    static removeJob (filter: (job: IEmployee) => boolean) 
    static updateJob  (job: IEmployee)
    static clearPerformingJob ()
    static setPerformingJob (branch: IBranch) 
    static changePassword (old: string, changed: string) 

  }

  class Branch {
    _id?: string
    name?: string
    contact?: string
    email?: string
    location?: string
    business?: IBusiness
    private static loadedList: IBranch[] | undefined 

    static add(branch: IBranch)
    static view(branch: IBranch) 
    static update(branch: IBranch)
    static remove(id: string)
    static async list (businessId: string)
    static setLoadedList(list: IBranch[] | undefined)
    static getLoadedList()
  }

  class Business {
    _id?: string;
    name?: string;
    email?: string;
    contact?: string;
    licence?: string;
    location?: string;
    founder?: IPerson | string;
    private static loadedList: IBusiness[];

    static delete (id: string) 
    static update (business: IBusiness) 
    static add (user_id: string, business: IBusiness) 
    static view (business: IBusiness) 
    static list ()
    static setLoadedList(list: IBusiness[]) 
    static getLoadedList(): IBusiness[] 
  }

  class Employee {
    _id?: string;
    user?: IUser;
    branch?: IBranch;
    role?: string;
    permissions?: Array<IPermission | string>;
    status?: "active" | "inactive";

    static self (user: IUser) 
    static add (employee: IEmployee) 
    static update (employee: IEmployee) 
    static view (employee: IEmployee) 
    static list ( user: IUser, branch : IBranch) 
  }

  class Product {
    _id?: string;
    name?: string;
    detail?: string;
    colour?: string;
    variant?: string;
  }

  class Inventory {
    _id?: string;
    product?: IProduct;
    branch?: IBranch;
    serialNumber?: string;
    unitBuyPrice?: number;
    unitSellPrice?: number;
    unitDescountPrice?: number;
    quantity?: number;

    private static list?: IInventory[];
    static getList = Inventory.list;
    static fetch (branch_id: string) 
    static add (inventory: IInventory) 
    static update (Inventory: IInventory) 
  }

  Person --|> User
  User --|> Employee
  Employee --|> Branch
  Branch --|> Business
  Product --|> Inventory
  Inventory --|> Branch
  Business --|> Employee

  note for Business "A User can have multiple employeementship\n hence multiple business."

```
