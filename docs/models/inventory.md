# Inventory Class Documentation
The Inventory class provides static methods for interacting with a server-side API to manage inventory-related data. It utilizes Axios for making HTTP requests and expects specific server endpoints defined in the ServerUrls module. The responses from the server are assumed to adhere to the structure defined in the [MyApiResponse](./../unified-response.md) interface.

## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
    - [Get Inventory List](#get-inventory-list)
    - [Fetch Inventory](#fetch-inventory)
    - [Add Inventory](#add-inventory)
    - [Update Inventory](#update-inventory)
 - [Error Handling](#error-handling)
 - [Examples](#examples)
    - [Getting Inventory List](#getting-inventory-list)
    - [Fetching Inventory](#fetching-inventory)
    - [Adding Inventory](#adding-inventory)
    - [Updating Inventory](#updating-inventory)
## Installation
Ensure that you have Axios installed in your project before using the Inventory class:

```bash
npm install axios
```
## Usage
### Get Inventory List
```typescript
/**
 * Retrieves the current list of inventory items.
 *
 * @returns {IInventory[] | undefined} The list of inventory items.
 */
Inventory.getList(): IInventory[] | undefined
```
### Fetch Inventory
```typescript
/**
 * Fetches inventory items for a specific branch from the server.
 *
 * @param {string} branch_id - The ID of the branch for which inventory items are to be fetched.
 * @returns {Promise<IInventory[]>} A Promise that resolves with an array of inventory items for the specified branch.
 */
Inventory.fetch(branch_id: string): Promise<IInventory[]>
```
### Add Inventory
```typescript
/**
 * Adds a new inventory item to the system.
 *
 * @param {IInventory} inventory - The inventory object to be added.
 * @returns {Promise<IInventory[]>} A Promise that resolves with the updated list of inventory items after the addition.
 */
Inventory.add(inventory: IInventory): Promise<IInventory[]>
```
### Update Inventory
```typescript
/**
 * Updates information for a specific inventory item.
 *
 * @param {IInventory} inventory - The inventory object with updated information.
 * @returns {Promise<void>} A Promise that resolves once the inventory item is successfully updated.
 */
Inventory.update(inventory: IInventory): Promise<void>
```
## Error Handling
The methods in the Inventory class return Promises that may be rejected if an error occurs during the HTTP request. Error handling is crucial to handle potential issues gracefully. The class uses console.error to log errors to the console. However, in a production environment, you might want to implement more robust error handling, such as displaying user-friendly error messages or triggering specific actions based on the type of error.

```typescript
/**
 * Adds a new inventory item to the system.
 *
 * @param {IInventory} inventory - The inventory object to be added.
 * @returns {Promise<IInventory[]>} A Promise that resolves with the updated list of inventory items after the addition.
 */
Inventory.add(inventory: IInventory): Promise<IInventory[]> {
  return axios
    .post<MyApiResponse<IInventory[]>>(ServerUrls.inventory.add, {
      ...inventory,
      branch: inventory.branch?._id,
    })
    .then((response) => response.data.data)
    .catch((error) => {
      console.error("Error adding inventory item:", error);
      throw error; // Re-throw the error to propagate it to the caller
    });
}

/**
 * Fetches inventory items for a specific branch from the server.
 *
 * @param {string} branch_id - The ID of the branch for which inventory items are to be fetched.
 * @returns {Promise<IInventory[]>} A Promise that resolves with an array of inventory items for the specified branch.
 */
Inventory.fetch(branch_id: string): Promise<IInventory[]> {
  return axios
    .get<MyApiResponse<IInventory[]>>(ServerUrls.inventory.get, {
      params: { branch_id },
    })
    .then((response) => response.data.data)
    .catch((error) => {
      console.error("Error fetching inventory:", error);
      throw error; // Re-throw the error to propagate it to the caller
    });
}

/**
 * Updates information for a specific inventory item.
 *
 * @param {IInventory} inventory - The inventory object with updated information.
 * @returns {Promise<void>} A Promise that resolves once the inventory item is successfully updated.
 */
Inventory.update(inventory: IInventory): Promise<void> {
  return axios
    .patch(ServerUrls.inventory.update, {
      ...inventory,
      branch: inventory.branch?._id,
    })
    .then(() => {})
    .catch((error) => {
      console.error("Error updating inventory item:", error);
      throw error; // Re-throw the error to propagate it to the caller
    });
}
```
This enhanced error handling will log errors to the console and then re-throw them, allowing the calling code to handle errors as needed. Feel free to customize the error handling logic based on your application's requirements.

## Examples
### Getting Inventory List
```typescript
const inventoryList = Inventory.getList();
console.log("Current Inventory List:", inventoryList);
```
### Fetching Inventory
```typescript
const branchId = "branch123";
Inventory.fetch(branchId)
  .then((inventoryItems) => {
    console.log(`Inventory items for branch ${branchId}:`, inventoryItems);
  })
  .catch((error) => {
    console.error("Error fetching inventory:", error);
  });
```
### Adding Inventory
```typescript
const newInventoryItem: IInventory = {
  product: {
    _id: "product456",
    // Other product details
  },
  branch: {
    _id: "branch789",
    // Other branch details
  },
  serialNumber: "SN123",
  unitBuyPrice: 50,
  unitSellPrice: 80,
  unitDescountPrice: 70,
  quantity: 100,
  // Other inventory details
};

Inventory.add(newInventoryItem)
  .then((updatedInventoryList) => {
    console.log("Inventory item added successfully. Updated Inventory List:", updatedInventoryList);
  })
  .catch((error) => {
    console.error("Error adding inventory item:", error);
  });
```
### Updating Inventory
```typescript
const updatedInventoryItem: IInventory = {
  _id: "inventory123",
  product: {
    _id: "product456",
    // Other updated product details
  },
  branch: {
    _id: "branch789",
    // Other updated branch details
  },
  serialNumber: "SN456",
  unitBuyPrice: 55,
  unitSellPrice: 85,
  unitDescountPrice: 75,
  quantity: 120,
  // Other updated inventory details
};

Inventory.update(updatedInventoryItem)
  .then(() => {
    console.log("Inventory item updated successfully.");
  })
  .catch((error) => {
    console.error("Error updating inventory item:", error);
  });
```


