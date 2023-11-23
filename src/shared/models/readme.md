# Models
Models are the classes of typescript to typeguard teh data of several types whole system consists of following modal classes
 1) Person [Source](./person.ts) - [Documentation](../../../docs/models/person.md) 
 2) User [Source](./user.ts) - [Documentation](../../../docs/models/user.md)
 3) Branch [Source](./branch.ts) - [Documentation](../../../docs/models/branch.md)
 4) Business [Source](./business.ts) - [Documentation](../../../docs/models/business.md)
 5) Employee [Source](./employee.ts) - [Documentation](../../../docs/models/employee.md)
 6) Inventory [Source](./inventory.ts) - [Documentation](../../../docs/models/inventory.md)
 7) Operation [Source](./operation.ts) - [Documentation](../../../docs/models/operation.md)
 8) Permission [Source](./permission.ts) - [Documentation](../../../docs/models/permission.md)


Below diagram explains the classes and their relationship

```mermaid
---
title: Ambar Architecture Class Diagram
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

  note for Business "A User can have multiple employeementship\n hence multiple business."

```

```mermaid
---
title: Ambar Architecture ER Diagram
---
erDiagram
  Person ||--|| User : contains
  User ||--o{ Employee : performs
  Employee }|--|{ Branch : hiredBy
  Branch }|--|| Business : ownedBy
  Product ||--|| Inventory : connects
  Inventory }o..|| Branch : availableAtStore
  Operation }|--|| Inventory : records
  Operation }|..|| Employee : recordsPerformee
```
