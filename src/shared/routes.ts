export const ServerUrls = {
  baseUrl: "http://localhost:1337",
  auth: {
    login: "/users/get",
    signup: "/users/create",
  },
  business: {
    get: "/businesses/get",
    add: "/businesses/create",
    update: "/businesses/update",
    remove: "/businesses/remove",
  },
  branch: {
    get: "/branches/get",
    add: "/branches/create",
    update: "/branches/update",
    remove: "/branches/remove",
  },
  person: {
    get: "/persons/get",
    add: "/persons/create",
    update: "/persons/update",
  },
  employee: {
    get: "/employees/get",
    add: "/employees/create",
    update: "/employees/update",
  },
  permissions: {
    get: "/permissions/get",
    // add: "/permissions/create",
    // update: "/permissions/update",
  },
  inventory: {
    get: "/inventory/get",
    add: "/inventory/create",
    update: "/inventory/update",
  },
  operation: {
    base: "operation/",
    add: "operation/create",
    get: "operation/get",
  },
};
export const ClientUrls = {
  baseUrl: "/",
  auth: {
    login: "login/",
    signup: "signup/",
  },
  employee: {
    base: "employee/",
    list: "list/",
    view: "view/",
    edit: "edit/",
  },
  business: {
    base: "business/",
    edit: "edit/",
    view: "view/",
  },
  inventory: {
    base: "inventory/",
    view: "view/",
    sale: "sale/",
  },
  operations: {
    base: "operations/",
    list: "list/",
  },
};
