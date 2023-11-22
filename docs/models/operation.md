# Operation Class Documentation
The Operation class provides static methods for interacting with a server-side API to manage operation-related data. It utilizes Axios for making HTTP requests and expects specific server endpoints defined in the ServerUrls module. The responses from the server are assumed to adhere to the structure defined in the [MyApiResponse](./../unified-response.md) interface.

## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
    - [Add Operation](#add-operation)
    - [Get Operations](#get-operations)
 - [Error Handling](#error-handling)
 - [Examples](#examples)
    - [Adding an Operation](#adding-an-operation)
    - [Getting Operations](#getting-operationss)
## Installation
Ensure that you have Axios installed in your project before using the Operation class:

```bash
npm install axios
```
## Usage
### Add Operation
```typescript
/**
 * Adds a new operation to the system.
 *
 * @param {IOperation} operation - The operation object to be added.
 * @returns {Promise<IOperation>} A Promise that resolves with the added operation's data.
 */
Operation.add(operation: IOperation): Promise<IOperation>
```
### Get Operations
```typescript
/**
 * Retrieves a list of operations based on the specified parameters.
 *
 * @param {Record<string, string>} params - The parameters for filtering operations.
 * @returns {Promise<IOperation[]>} A Promise that resolves with an array of operations based on the specified parameters.
 */
Operation.get(params: Record<string, string>): Promise<IOperation[]>
```
### Error Handling
The methods in the Operation class return Promises that may be rejected if an error occurs during the HTTP request. Error handling is crucial to handle potential issues gracefully. The class uses console.error to log errors to the console. However, in a production environment, you might want to implement more robust error handling, such as displaying user-friendly error messages or triggering specific actions based on the type of error.

```typescript
/**
 * Adds a new operation to the system.
 *
 * @param {IOperation} operation - The operation object to be added.
 * @returns {Promise<IOperation>} A Promise that resolves with the added operation's data.
 */
Operation.add(operation: IOperation): Promise<IOperation> {
  return axios
    .post<MyApiResponse<IOperation>>(ServerUrls.operation.add, {
      ...operation,
      inventory: operation.inventory?._id,
      employee: operation.employee?._id,
    })
    .then((response) => response.data.data)
    .catch((error) => {
      console.error("Error adding operation:", error);
      throw error; // Re-throw the error to propagate it to the caller
    });
}

/**
 * Retrieves a list of operations based on the specified parameters.
 *
 * @param {Record<string, string>} params - The parameters for filtering operations.
 * @returns {Promise<IOperation[]>} A Promise that resolves with an array of operations based on the specified parameters.
 */
Operation.get(params: Record<string, string>): Promise<IOperation[]> {
  return axios
    .get<MyApiResponse<IOperation[]>>(ServerUrls.operation.get, {
      params: params,
    })
    .then((response) => response.data.data)
    .catch((error) => {
      console.error("Error getting operations:", error);
      throw error; // Re-throw the error to propagate it to the caller
    });
}
```
This enhanced error handling will log errors to the console and then re-throw them, allowing the calling code to handle errors as needed. Feel free to customize the error handling logic based on your application's requirements.

## Examples
### Adding an Operation
```typescript
const newOperation: IOperation = {
  inventory: {
    _id: "inventory123",
    // Other inventory details
  },
  employee: {
    _id: "employee456",
    // Other employee details
  },
  action: "sale",
  quantity: 10,
  price: 100,
  // Other operation details
};

Operation.add(newOperation)
  .then((addedOperation) => {
    console.log("Operation added successfully:", addedOperation);
  })
  .catch((error) => {
    console.error("Error adding operation:", error);
  });
```
### Getting Operations
```typescript
const operationParams: Record<string, string> = {
  employee_id: "employee123",
  // Other parameters for filtering operations
};

Operation.get(operationParams)
  .then((operations) => {
    console.log("List of operations:", operations);
  })
  .catch((error) => {
    console.error("Error getting operations:", error);
  });
```



