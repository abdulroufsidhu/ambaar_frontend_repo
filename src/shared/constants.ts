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
  },
  branch: {
    get: "/branches/get",
    add: "/branches/create",
    update: "/branches/update",
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
    add: "/permissions/create",
    update: "/permissions/update",
  },
  inventory: {
    get: "/inventory/get",
    add: "/inventory/create",
    update: "/inventory/update",
  },
};

export const MyDrawerConstants = {
  width: {
    min: "80px",
    max: "240px",
  },
};
