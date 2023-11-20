# Person.md

## Overview

The `Person` class, defined in the provided TypeScript file, serves as a crucial component within a broader system for managing business-related data. Leveraging the Axios library, it facilitates communication with a server through various endpoints specified in the `ServerUrls` module. The functionalities within this class are centered around the manipulation and retrieval of individual person records, encapsulated by the `IPerson` interface.

### IPerson Interface

The `IPerson` interface outlines the structure of a person object, encompassing key attributes such as `_id`, `name`, `username`, `nationalId`, `contact`, and `email`. This interface acts as a blueprint for creating and interacting with person entities within the system.

```typescript
export interface IPerson {
  _id?: string;
  name?: string;
  username?: string;
  nationalId?: string;
  contact?: string;
  email?: string;
}
```


### Class Methods

#### 1. `add`

The `add` method enables the addition of a new person to the system by making a POST request to the server's designated endpoint (`ServerUrls.person.add`). Upon success, the method returns the added person's data wrapped in a custom response structure (`MyApiResponse`).

#### 2. `view`

The `view` method facilitates the retrieval of a specific person's information by making a GET request to the server's endpoint (`ServerUrls.person.get`). It takes a `Person` object as a parameter, and upon successful execution, it returns the retrieved person's data in the specified response structure.

#### 3. `list`

The `list` method retrieves a list of persons associated with a particular business. It accepts a `businessId` as a parameter and makes a GET request to the server's endpoint (`ServerUrls.person.get`). The method returns an array of person objects associated with the specified business, encapsulated within the `MyApiResponse` structure.

### Error Handling

All methods within the `Person` class incorporate error handling through promises, logging any encountered errors to the console using `console.error`. This ensures that potential issues during network requests are captured and can be addressed effectively.

By leveraging the functionalities provided by the `Person` class, developers can seamlessly integrate person management capabilities into their broader business applications.