# Person Class Documentation
The `Person` class provides a set of static methods for interacting with a server-side API to manage person-related data. It leverages the Axios library for making HTTP requests and assumes the existence of specific server endpoints defined in the `ServerUrls` module. The responses from the server are expected to adhere to the structure defined in the `MyApiResponse` interface.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Add a Person](#add-a-person)
  - [View a Person](#view-a-person)
  - [List Persons](#list-persons)
- [Error Handling](#error-handling)
- [Examples](#examples)
## Installation
Before using the `Person` class, ensure that you have Axios installed in your project. You can install it using:
```
npm install axios
```

## Usage
### Add a Person
```typescript
/**
 * Adds a new person to the system.
 *
 * @param {IPerson} person - The person object to be added.
 * @returns {Promise<IPerson>} A Promise that resolves with the added person's data.
 */
Person.add(person: IPerson): Promise<IPerson>
```

### View a Person
```typescript
Copy code
/**
 * Retrieves information about a specific person.
 *
 * @param {IPerson} person - The person object with identification information.
 * @returns {Promise<IPerson>} A Promise that resolves with the retrieved person's data.
 */
Person.view(person: IPerson): Promise<IPerson>
```
### List Persons

```typescript
Copy code
/**
 * Retrieves a list of persons associated with a specific business.
 *
 * @param {string} businessId - The unique identifier of the business.
 * @returns {Promise<IPerson[]>} A Promise that resolves with an array of persons associated with the business.
 */
Person.list(businessId: string): Promise<IPerson[]>
```

## Error Handling
The methods in the `Person` class return Promises that may be rejected if an error occurs during the HTTP request. Error handling is done by logging the error to the console using `console.error`. It is recommended to implement additional error handling based on your application's requirements.

## Examples
### Adding a Person
```typescript
const newPerson: IPerson = {
  name: "John Doe",
  username: "johndoe",
  contact: "+1234567890",
  email: "john.doe@example.com",
};

Person.add(newPerson)
  .then((addedPerson) => {
    console.log("Person added successfully:", addedPerson);
  })
  .catch((error) => {
    console.error("Error adding person:", error);
  });
```
### Viewing a Person
```typescript
Person.view(personToView : {_id: String})
  .then((viewedPerson) => {
    console.log("Person details:", viewedPerson);
  })
  .catch((error) => {
    console.error("Error viewing person:", error);
  });
```

### Listing Persons
```typescript
Person.list(businessId)
  .then((persons) => {
    console.log("Persons associated with the business:", persons);
  })
  .catch((error) => {
    console.error("Error listing persons:", error);
  });
```


