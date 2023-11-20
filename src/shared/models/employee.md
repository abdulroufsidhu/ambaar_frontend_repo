# Employee Class Documentation
The Employee class provides static methods for interacting with a server-side API to manage employee-related data. It utilizes Axios for making HTTP requests and expects specific server endpoints defined in the ServerUrls module. The responses from the server are assumed to adhere to the structure defined in the MyApiResponse interface.

## Table of Contents
 - [Installation]
 - [Usage]
    - [Get Self Employee]
    - [Add an Employee]
    - [Update an Employee]
    - [View an Employee]
    - [List Employees]
 - [Error Handling]
 - [Examples]
## Installation
Ensure that you have Axios installed in your project before using the Employee class:

```bash
npm install axios
```
## Usage
### Get Self Employee
```typescript
/**
 * Retrieves the details of the authenticated user as an employee.
 *
 * @param {IEmployee} employee - The employee object with user information.
 * @returns {Promise<IEmployee[]>} A Promise that resolves with an array containing the details of the authenticated user as an employee.
 */
Employee.self(employee: IEmployee): Promise<IEmployee[]>
```
### Add an Employee
```typescript
/**
 * Adds a new employee to the system.
 *
 * @param {IEmployee} employee - The employee object to be added.
 * @returns {Promise<IEmployee>} A Promise that resolves with the added employee's data.
 */
Employee.add(employee: IEmployee): Promise<IEmployee>
```
### Update an Employee
```typescript
/**
 * Updates information for a specific employee.
 *
 * @param {IEmployee} employee - The employee object with updated information.
 * @returns {Promise<IEmployee>} A Promise that resolves with the updated employee's data.
 */
Employee.update(employee: IEmployee): Promise<IEmployee>
```
### View an Employee
```typescript
/**
 * Retrieves information about a specific employee.
 *
 * @param {IEmployee} employee - The employee object with identification information.
 * @returns {Promise<IEmployee>} A Promise that resolves with the retrieved employee's data.
 */
Employee.view(employee: IEmployee): Promise<IEmployee>
```
### List Employees
```typescript
/**
 * Retrieves a list of employees based on the specified user and branch.
 *
 * @param {IEmployee} employee - The employee object with user and branch information.
 * @returns {Promise<IEmployee[]>} A Promise that resolves with an array of employees based on the specified user and branch.
 */
Employee.list(employee: IEmployee): Promise<IEmployee[]>
```
## Error Handling
The methods in the Employee class return Promises that may be rejected if an error occurs during the HTTP request. Error handling is done by logging the error to the console using console.error. Additional error handling logic can be implemented based on the specific needs of your application.

## Examples
### Getting Self Employee
```typescript
const authenticatedEmployee: IEmployee = {
  user: {
    _id: "user123",
    // Other user details
  },
};

Employee.self(authenticatedEmployee)
  .then((selfEmployee) => {
    console.log("Self Employee Details:", selfEmployee);
  })
  .catch((error) => {
    console.error("Error getting self employee:", error);
  });
```
### Adding an Employee
```typescript
const newEmployee: IEmployee = {
  user: {
    _id: "user456",
    // Other user details
  },
  branch: {
    _id: "branch789",
    // Other branch details
  },
  role: "Manager",
  // Other employee details
};

Employee.add(newEmployee)
  .then((addedEmployee) => {
    console.log("Employee added successfully:", addedEmployee);
  })
  .catch((error) => {
    console.error("Error adding employee:", error);
  });
```
### Updating an Employee
```typescript
const updatedEmployee: IEmployee = {
  _id: "employee123",
  user: {
    _id: "user456",
    // Other updated user details
  },
  branch: {
    _id: "branch789",
    // Other updated branch details
  },
  role: "Supervisor",
  // Other updated employee details
};

Employee.update(updatedEmployee)
  .then((updatedEmployeeData) => {
    console.log("Employee updated successfully. Updated data:", updatedEmployeeData);
  })
  .catch((error) => {
    console.error("Error updating employee:", error);
  });
```
### Viewing an Employee
```typescript
const employeeToView: IEmployee = { _id: "employee456" };

Employee.view(employeeToView)
  .then((viewedEmployee) => {
    console.log("Employee details:", viewedEmployee);
  })
  .catch((error) => {
    console.error("Error viewing employee:", error);
  });
```
### Listing Employees
```typescript
const employeeListParams: IEmployee = {
  user: {
    _id: "user123",
    // Other user details
  },
  branch: {
    _id: "branch789",
    // Other branch details
  },
};

Employee.list(employeeListParams)
  .then((employees) => {
    console.log("List of employees:", employees);
  })
  .catch((error) => {
    console.error("Error listing employees:", error);
  });
```

