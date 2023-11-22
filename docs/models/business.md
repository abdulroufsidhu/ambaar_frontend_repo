# Business Class Documentation
The `Business` class encapsulates static methods for interacting with a server-side API to manage business-related data. This class relies on Axios for making HTTP requests and expects specific server endpoints defined in the `ServerUrls` module. The responses from the server are assumed to conform to the structure specified in the [MyApiResponse](./unified-response.md) interface.

## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
    - [Add a Business](#add-a-business)
    - [View a Business](#view-a-business)
    - [List Businesses](#list-businesses)
    - [Update a Business](#update-a-business)
    - [Delete a Business](#delete-a-business)
    - [Manage Loaded List](#manage-loaded-list)
 - [Error Handling](#error-handling)
 - [Examples](#examples)
## Installation
Ensure that you have Axios installed in your project before using the `Business` class:
```bash
npm install axios
```
## Usage
### Add a Business
```typescript

/**
 * Adds a new business to the system.
 *
 * @param {string} user_id - The unique identifier of the user associated with the business.
 * @param {IBusiness} business - The business object to be added.
 * @returns {Promise<IEmployee>} A Promise that resolves with the employee data associated with the added business.
 */
Business.add(user_id: string, business: IBusiness): Promise<IEmployee>
```
### View a Business

```typescript

/**
 * Retrieves information about a specific business.
 *
 * @param {IBusiness} business - The business object with identification information.
 * @returns {Promise<IBusiness>} A Promise that resolves with the retrieved business data.
 */
Business.view(business: IBusiness): Promise<IBusiness>
```
### List Businesses
```typescript

/**
 * Retrieves a list of all businesses.
 *
 * @returns {Promise<IBusiness[]>} A Promise that resolves with an array of all businesses.
 */
Business.list(): Promise<IBusiness[]>
```
### Update a Business
```typescript

/**
 * Updates information for a specific business.
 *
 * @param {IBusiness} business - The business object with updated information.
 * @returns {Promise<IBusiness>} A Promise that resolves with the updated business data.
 */
Business.update(business: IBusiness): Promise<IBusiness>
```
### Delete a Business
```typescript

/**
 * Deletes a specific business from the system.
 *
 * @param {string} id - The unique identifier of the business to be deleted.
 * @returns {Promise<IBusiness>} A Promise that resolves when the business is successfully deleted.
 */
Business.delete(id: string): Promise<IBusiness>
```
### Manage Loaded List
```typescript

/**
 * Sets the loaded list of businesses.
 *
 * @param {IBusiness[]} list - The array of businesses to be set as the loaded list.
 */
Business.setLoadedList(list: IBusiness[]): void

/**
 * Retrieves the loaded list of businesses.
 *
 * @returns {IBusiness[]} The array of businesses that have been loaded.
 */
Business.getLoadedList(): IBusiness[]
```
## Error Handling
The methods in the `Business` class return Promises that may be rejected if an error occurs during the HTTP request. Error handling is currently done by logging the error to the console using `console.error`. It is recommended to implement additional error handling based on your application's requirements.

## Examples
### Adding a Business
```typescript

const newBusiness: IBusiness = {
  name: "Acme Corporation",
  email: "info@acme.com",
  contact: "+1234567890",
  licence: "XYZ123",
  location: "Cityville",
  founder: "John Doe",
};

const userId = "user123";

Business.add(userId, newBusiness)
  .then((employeeData) => {
    console.log("Business added successfully. Employee data:", employeeData);
  })
  .catch((error) => {
    console.error("Error adding business:", error);
  });
```
### Viewing a Business
```typescript

const businessToView: IBusiness = { _id: "business123" };

Business.view(businessToView)
  .then((viewedBusiness) => {
    console.log("Business details:", viewedBusiness);
  })
  .catch((error) => {
    console.error("Error viewing business:", error);
  });
```
### Listing Businesses
```typescript

Business.list()
  .then((businesses) => {
    console.log("List of businesses:", businesses);
  })
  .catch((error) => {
    console.error("Error listing businesses:", error);
  });
```
### Updating a Business
```typescript

const updatedBusiness: IBusiness = {
  _id: "business123",
  name: "Updated Corporation",
  email: "updated@corporation.com",
  contact: "+9876543210",
  licence: "ABC789",
  location: "Townsville",
  founder: "Jane Smith",
};

Business.update(updatedBusiness)
  .then((updatedBusinessData) => {
    console.log("Business updated successfully. Updated data:", updatedBusinessData);
  })
  .catch((error) => {
    console.error("Error updating business:", error);
  });
  ```
### Deleting a Business
```typescript

const businessIdToDelete = "business123";

Business.delete(businessIdToDelete)
  .then((deletedBusiness) => {
    console.log("Business deleted successfully. Deleted data:", deletedBusiness);
  })
  .catch((error) => {
    console.error("Error deleting business:", error);
  });
```


