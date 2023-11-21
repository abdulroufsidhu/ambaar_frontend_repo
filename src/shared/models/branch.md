# Branch Class Documentation
The Branch class provides static methods for interacting with a server-side API to manage branch-related data. It utilizes Axios for making HTTP requests and assumes the existence of specific server endpoints defined in the ServerUrls module. The responses from the server are expected to adhere to the structure defined in the [MyApiResponse](./../unified-response.md) interface. Additionally, the class has a method for managing the loaded list of branches.

## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
    - [Add a Branch](#add-a-branch)
    - [View a Branch](#view-a-branch)
    - [Update a Branch](#update-a-branch)
    - [Remove a Branch](#remove-a-branch)
    - [List Branches](#list-branches)
    - [Manage Loaded List](#manage-loaded-list-branch)
 - [Error Handling](#error-handling)
 - [Examples](#examples)
## Installation
Before using the Branch class, ensure that you have Axios installed in your project:

```bash
npm install axios
```
## Usage
### Add a Branch
```typescript
/**
 * Adds a new branch to the system.
 *
 * @param {IBranch} branch - The branch object to be added.
 * @returns {Promise<IBranch>} A Promise that resolves with the added branch's data.
 */
Branch.add(branch: IBranch): Promise<IBranch>
```
### View a Branch
```typescript
/**
 * Retrieves information about a specific branch.
 *
 * @param {IBranch} branch - The branch object with identification information.
 * @returns {Promise<IBranch>} A Promise that resolves with the retrieved branch's data.
 */
Branch.view(branch: IBranch): Promise<IBranch>
```
### Update a Branch
```typescript
/**
 * Updates information for a specific branch.
 *
 * @param {IBranch} branch - The branch object with updated information.
 * @returns {Promise<IEmployee>} A Promise that resolves with the updated branch's data.
 */
Branch.update(branch: IBranch): Promise<IEmployee>
```
### Remove a Branch
```typescript
/**
 * Removes a specific branch from the system.
 *
 * @param {string} id - The unique identifier of the branch to be removed.
 * @returns {Promise<void>} A Promise that resolves when the branch is successfully removed.
 */
Branch.remove(id: string): Promise<void>
```
### List Branches
```typescript
/**
 * Retrieves a list of branches associated with a specific business.
 *
 * @param {string} businessId - The unique identifier of the business.
 * @returns {Promise<IBranch[]>} A Promise that resolves with an array of branches associated with the business.
 */
Branch.list(businessId: string): Promise<IBranch[]>
```
### Manage Loaded List (Branch)
```typescript
/**
 * Sets the loaded list of branches.
 *
 * @param {IBranch[] | undefined} list - The array of branches to be set as the loaded list.
 */
Branch.setLoadedList(list: IBranch[] | undefined): void

/**
 * Retrieves the loaded list of branches.
 *
 * @returns {IBranch[] | undefined} The array of branches that have been loaded.
 */
Branch.getLoadedList(): IBranch[] | undefined
```
## Error Handling
The methods in the Branch class return Promises that may be rejected if an error occurs during the HTTP request. Error handling is currently done by logging the error to the console using console.error. Additional error handling logic can be implemented based on the specific needs of your application.

## Examples
### Adding a Branch
```typescript
const newBranch: IBranch = {
  name: "City Center Branch",
  contact: "+9876543210",
  email: "citycenter@example.com",
  location: "City Center, Main Street",
  business: { _id: "business123" },
};

Branch.add(newBranch)
  .then((addedBranch) => {
    console.log("Branch added successfully:", addedBranch);
  })
  .catch((error) => {
    console.error("Error adding branch:", error);
  });
```
### Viewing a Branch
```typescript
const branchToView: IBranch = { _id: "branch456" };

Branch.view(branchToView)
  .then((viewedBranch) => {
    console.log("Branch details:", viewedBranch);
  })
  .catch((error) => {
    console.error("Error viewing branch:", error);
  });
```
### Updating a Branch
```typescript
const updatedBranch: IBranch = {
  _id: "branch456",
  name: "Updated City Center Branch",
  contact: "+1234567890",
  email: "updatedcitycenter@example.com",
  location: "Updated City Center, Main Street",
  business: { _id: "business123" },
};

Branch.update(updatedBranch)
  .then((updatedBranchData) => {
    console.log("Branch updated successfully. Updated data:", updatedBranchData);
  })
  .catch((error) => {
    console.error("Error updating branch:", error);
  });
```
### Removing a Branch
```typescript
const branchIdToRemove = "branch456";

Branch.remove(branchIdToRemove)
  .then(() => {
    console.log("Branch removed successfully.");
  })
  .catch((error) => {
    console.error("Error removing branch:", error);
  });
```
### Listing Branches
```typescript
const businessIdToList = "business123";

Branch.list(businessIdToList)
  .then((branches) => {
    console.log("List of branches:", branches);
  })
  .catch((error) => {
    console.error("Error listing branches:", error);
  });
```



