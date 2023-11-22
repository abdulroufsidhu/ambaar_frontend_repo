# Permission Class Documentation
The Permission class provides static methods for managing permissions, including fetching permissions from a server and reading/storing them in the session storage. This class utilizes Axios for making HTTP requests and expects specific server endpoints defined in the ServerUrls module. The responses from the server are assumed to adhere to the structure defined in the [MyApiResponse](./unified-response.md) interface.

## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
    - [Get All Permissions](#get-all-permissions)
    - [Fetch All Permissions](#fetch-all-permissions)
    - [Type Guard Function](#type-guard-function)
    - [Session Storage Management](#session-storage-management)
 - [Error Handling](#error-handling)
 - [Examples](#examples)
## Installation
Ensure that you have Axios installed in your project before using the Permission class:

```bash
npm install axios
```
## Usage
### Get All Permissions
```typescript
/**
 * Retrieves all permissions from the session storage.
 *
 * @returns {IPermission[]} An array containing all permissions.
 */
Permission.getAllPermissions(): IPermission[]
```
### Fetch All Permissions
```typescript
/**
 * Fetches all permissions from the server and stores them in the session storage.
 *
 * @returns {Promise<IPermission[]>} A Promise that resolves with an array of all permissions.
 */
Permission.fetchAll(): Promise<IPermission[]>
```
### Type Guard Function
```typescript
/**
 * Type guard function to check if the given value is an IPermission object.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} true if the value is an IPermission object, false otherwise.
 */
Permission.isIPermission(value: any): value is IPermission
```
### Session Storage Management
The Permission class uses the SessionStorageManager utility to read and store permissions in the session storage. The session storage is used to persist permissions across sessions.

## Error Handling
The methods in the Permission class may throw errors during the HTTP request. Error handling is done by logging the error to the console using console.error. Additional error handling logic can be implemented based on the specific needs of your application.

## Examples
### Getting All Permissions
```typescript
const allPermissions = Permission.getAllPermissions();
console.log("All Permissions:", allPermissions);
Fetching All Permissions
typescript
Copy code
Permission.fetchAll()
  .then((permissions) => {
    console.log("Fetched Permissions:", permissions);
  })
  .catch((error) => {
    console.error("Error fetching permissions:", error);
  });
```
### Type Guard Usage
```typescript
const someValue: any = { _id: "permission123", name: "READ" };

if (Permission.isIPermission(someValue)) {
  console.log("Valid Permission:", someValue);
} else {
  console.error("Invalid Permission:", someValue);
}
```


