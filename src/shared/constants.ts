export const ServerUrls = {
  baseUrl: "http://localhost:1337",
  auth: {
    login: "/users/get",
    signup: "/users/create",
  },
  business: {
    get: "/businesses/get",
    add: "/businesses/create",
  },
  branch: {
    get: "/branches/get",
    add: "/branches/create",
  },
  person: {
    get: "/persons/get",
    add: "/persons/create",
  },
  employee: {
    get: "/employees/get",
    add: "/employees/create",
  },
  permissions: {
    get: "/permissions/get",
    add: "/permissions/create"
  }
};

export const MyDrawerConstants = {
  width: {
    min: "80px",
    max: "240px"
  }
}
