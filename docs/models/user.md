# User.md

## Overview

The `User` class, implemented in the provided TypeScript file, plays a pivotal role in managing user-related operations within the application. Leveraging Axios for HTTP requests and incorporating functionalities from various modules, the class addresses user authentication, job management, and other related tasks. The `IUser` interface defines the structure of user objects, encapsulating information such as `_id`, `person`, `jobs`, `token`, and `performingJob`.

### IUser Interface

The `IUser` interface outlines the structure of a user object, encompassing key attributes like `_id`, `person`, `jobs`, `token`, and `performingJob`. It serves as a blueprint for creating and interacting with user entities within the system.

```typescript
export interface IUser {
  _id?: string;
  person?: IPerson;
  jobs?: IEmployee[];
  token?: string;
  performingJob?: IEmployee;
}
```
### Class Methods
#### 1. getInstance

The getInstance method retrieves or creates a singleton instance of the User class, managing user-related information. It utilizes session storage and asynchronous processes for user initialization and post-login processing.

```typescript
static getInstance = () => IUser;
```
#### 2. login

The login method facilitates user authentication by making a GET request to the server's login endpoint (ServerUrls.auth.login). It takes email and password as parameters and, upon success, initiates post-login processing.

```typescript
static login = async (email: string, password: string) => Promise<IUser | undefined>
  
```
#### 3. postLoginProcess

The postLoginProcess method handles post-login processing, including fetching user jobs, permissions, and storing relevant information in session storage.

```typescript
private static postLoginProcess = (user?: IUser) => Promise<IUser | undefined> | undefined;
```
#### 4. signup

The signup method registers a new user by making a POST request to the server's signup endpoint (ServerUrls.auth.signup). It accepts user information (person), a password, and an optional parameter for automatic login (autoLogin). if this autoLogin provided then [postLoginProcess](#3-postloginprocess) gets executed

```typescript
static signup = async (
  person: IPerson,
  password: string,
  autoLogin = false
) => Promise<IUser | undefined>
  
```
#### 5. logout

The logout method logs out the user by removing user-related information from session storage and resetting the User instance.

```typescript
static logout = async () => Promise<IUser | undefined>
  
```
#### 6. addJob, removeJob, updateJob

These methods manage the user's job-related information, allowing the addition, removal, and updating of job entries associated with the user.

```typescript
static addJob = (job: IEmployee) => void;
static removeJob = (filter: (job: IEmployee) => boolean) => void;

static updateJob = (job: IEmployee) => void;
```
#### 7. clearPerformingJob, setPerformingJob

These methods handle the user's performing job information, enabling the clearing and setting of the performing job, based on the associated branch.

```typescript
static clearPerformingJob = () => void;

static setPerformingJob = (branch: IBranch) => void;
```
#### 8. changePassword

The changePassword method initiates a password change by making a PATCH request to the server's change password endpoint (ServerUrls.auth.ChangePassword).

```typescript
static changePassword = (old: string, changed: string) => Promise<AxiosResponse<any, any>>;
```
### Error Handling

The class incorporates error handling through console.error statements, ensuring that potential issues during network requests are captured and logged.

By leveraging the functionalities provided by the User class, developers can seamlessly integrate user authentication and management capabilities into their broader applications.