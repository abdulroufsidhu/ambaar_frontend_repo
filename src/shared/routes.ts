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
};
export const ClientUrls = {
  baseUrl: "/",
  auth: {
    login: "login/",
    signup: "signup/",
  },
  employee: {
    base: "employee/",
    list: "employee/list/",
    view: "employee/view/",
    edit: "employee/edit/",
  },
  business: {
    base: "business/",
    edit: "business/edit",
    view: "business/view",
  },
  inventory: {
    base: "inventory/",
    view: "inventory/view/",
    sale: "inventory/sale/",
  },
};
