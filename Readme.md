# Inventory & Sales Management 
A backend system used to manage inventory and sales for a small shop

- Click here for [Api Documentation](#Api-Documentation)

## Features

- **Authentication Service:**

  - **User Signup:** Users can create new accounts by providing their personal details.
  - **User Signin:** Registered users can sign in to access their accounts.

- **Inventory Service:**

  - **Adding Item:**  This service Enables users to add an item to the inventory.
  - **Item Details:** This service Allows users to view a specifc item details.
  - **Update Item:** This service allows users to update a speific item.
  - **Delete Item:** This service allows users to delete a speific item.


- **Billing Service:**

  - **Bill Creation:**  This service Enables users to create a bill for a sale transaction.
  - **Bill Details:**  This service Enables users to get details about a bill.
  - **Update Bill:**  This service allows users to update a specific bill.
  - **View Bills:**  This service allows users to retrieve a list of  all bills.
  - **Delete Bill:**  This service allows users to delete a specific bill.

## Other Features

### Dockerization

This application is containerized using **Docker**, ensuring consistent deployment across environments.

### OAuth2 with JWT 

- **JSON Web Tokens (JWT)** are issued upon successful authentication, allowing secure communication between services.

### Technologies Used

- Typescript
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Docker
- bcrypt.js

## Getting Started
there are two ways to achieve this:
1. `Using docker ` - recommended 
- **Clone the Repository:**
  - **https:** git clone https://github.com/profsam97/quickprism.git
  - **ssh:** git clone git@github.com:profsam97/quickprism.git

- **Run the following command:**
```bash
docker compose up -d
```
- **Test the app:**
## Make use of postman or similar service, access by the Host ip:5000, e.g if the host ip is 192.168.0.1, then use 192.168.0.1:5000.

2. `Run locally`

- **Clone the Repository:**
  - **https:** git clone git@github.com:profsam97/quickprism.git
  - **ssh:** git clone git@github.com:profsam97/quickprism.git

-**Install the dependencies:**

```bash
npm install
```

-**Configure environment variables (e.g., Mongodb connections, jwt token):**
```bash
Mongo_URL=''
JWT_SECRET=''
PORT='default value is 5000, but you can set any value here'
```
-**Run the app using:**

```bash
npm run dev 
```
-**Testing the app:**
## use postman or similar services, using [http://localhost:5000](http://localhost:5000) 

## Api Documentation

This service is in charge of all Authentication and Authorization functions

> ## Auth
## Description

- [User Signup](#user-signup)
- [User Signin](#user-signin)

## User Signup

> **POST** /user/signup

| Body      |              | Description                                             |
| --------- | ------------ | ------------------------------------------------------- |
| username  | **required** | Username of the account to be created                   |
| Password  | **required** | password of the account to be created                  |

#### Sample Response

> Status : 201 Created

```json
{
  "message": "User successfully saved"
}
```

### Possible error message

```json
{
  "message": "User already exist or input validation error ",
  "errors": [
    {
      "username": "username is required",
      "username": "username must be at least 4 characters"
    },
    {
      "Password": "must be at least 6 characters",
      "Password": "Password must not contain  password"
    }, {
        "server" : "Internal Server Error"
    }
  ]
}
```

---

## User Signin

> **POST** /auth/signin

| Body        |              | Description                                |
| --------    | ------------ | ------------------------------------------ |
| username    | **required** | Username of the account                    |
| Password    | **required** | password of the account                    |

## Sample Response

> Status: 200 Ok

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImZhbnRhsssY29rZUBnbWFpbC5jb20iLCJGaXJzdF9uYW1lIjoiRmFudGEiLCJMYXN0X25hbWUiOiJDb2tlIiwiVWlkIjoiNjU4YjU1ODM0N2U4ODlhMssszFlOWVlODVmIiwiVXNlcl90eXBlIjoiQURNSU4iLCJleHAiOjE3MDM3NTcxNjB9.L0HiRH399fEF1EssIUGrymV9lmeth3OJtbEu0QqIt-4"
}
```

### Possible error messages

```json
  {
    "message":"user does not exist"}
   "error" :[
    {
      "username":"You dont have an account with us, please register",
    },
    {
      "Password":"Invalid username or password"
    },
     {
    "message":"internal server error"
  }
   ]
```

---

# Inventory 

## Description

This service let authenticated users to:
- **Add new items to inventory**
- **Retrieve a list of items in the inventory**
- **Get a specific item in the inventory**
- **Update an item in the Inventory**
- **Delete an Item in the Inventory**


> ## Inventory

- [Get Items](#get-item)
- [Get item](#get-single-item)
- [Create item](#create-item)
- [Update item](#update-item)
- [Delete item](#delete-item)

## Get Item

> **Get** /items

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


> Status : 200

#### Sample Response

```json
  {
         "_id": "66b7210abf87251645137be8",
        "name": "Rice",
        "price": 20,
        "stock": 4,
        "createdBy": "66b720bfbf87251645137bde",
        "description": "This is a very quanlity rice",
        "createdAt": "2024-08-10T08:12:58.794Z",
        "updatedAt": "2024-08-10T08:16:48.883Z"
  },
    {
         "_id": "66b7210abf87251645137be8",
        "name": "Beans",
        "price": 40,
        "stock": 55,
        "createdBy": "66b720bfbf87251645137bde",
        "description": "This is red beans",
        "createdAt": "2024-04-28T22:36:51Z",
        "updatedAt": "2024-04-29T09:52:40Z"
  }
```
### Possible error message

```json
{
  "errors": [
    {
        "message": "unauthorized"
    },
   {
        "server" : "Internal Server Error"
    }
  ]
}
```

---

## Get Item

> **GET** /item/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Param |              | Description |
| ----- | ------------ | ----------- |
| id    | **required** | Item Id  |

## Sample Response

> Status: 200 Ok

```json
  {
         "_id": "66b7210abf87251645137be8",
        "name": "Rice",
        "price": 20,
        "stock": 4,
        "createdBy": "66b720bfbf87251645137bde",
        "description": "This is a very quanlity rice",
        "createdAt": "2024-08-10T08:12:58.794Z",
        "updatedAt": "2024-08-10T08:16:48.883Z"
  }
```

### Possible error messages

```json
  {
    "message":"user does not exist"}
  "errors": [
    {
        "message": "unauthorized"
    },
    {
        "message": "item not found"
    },
   {
        "server" : "Internal Server Error"
    }
  ]
```

---

## Create Item

> **POST** /item

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


| Body        |              | Description                                   |
| --------    | ------------ | --------------------------------------------- |
| price       | **required** | price of the item                             |
| stock       | **required** | how many stock is available                   |
| description | **required** | give a brief description of the item          |
| name        | **required** | the name/title of the item                    |

## Sample Response

> Status: 200 Ok

```json
  {     "Message" : "Inventory created successfully",
        "item" : {
         "_id": "66b7210abf87251645137be8",
        "name": "Rice",
        "price": 20,
        "stock": 4,
        "createdBy": "66b720bfbf87251645137bde",
        "description": "This is a very quanlity rice",
        "createdAt": "2024-08-10T08:12:58.794Z",
        "updatedAt": "2024-08-10T08:16:48.883Z"
        }
  }
```
### Possible error messages

```json
  "errors": [
    {
        "message": "unauthorized"
    },
    {
        "message": "Bad Request"
    },
   {
        "server" : "Internal Server Error"
    }
  ]
```
---


## Update Item

> **PUT** /item/:id

 Param  |               | Description |
| ----- | ------------ | ----------- |
| id    | **required** | item id     |


| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

# any of the below will be accepted
| Body        |              | Description                                   |
| --------    | ------------ | --------------------------------------------- |
| price       | **optional** | price of the item                             |
| stock       | **optional** | how many stock is available                   |
| description | **optional** | give a brief description of the item          |
| name        | **optional** | the name/title of the item                    |

#### Sample Response

> Status : 200 Ok

```json
{
  "Message" : "Item updated  successfully"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
   {
    "message":"Item does not exist",

  },
  {
    "message": "unauthorized"
  },
```

# Delete Item


> **Delete** /item/:id

 Param  |               | Description |
| ----- | ------------  | ----------- |
| id    | **required**  | item id     |


| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


#### Sample Response

> Status : 200 Ok

```json
{
  "Message" : "Item has been deleted Successfully"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",
  },
   {
    "message":"Item not found",

  },
  {
    "message": "unauthorized"
  },
```


# Bill 

## Description

This service let authenticated users to:
- **Create a bill for a sale transaction**
- **Retrieve a list of bills**
- **Get details of a specific bill**
- **Update a bill, which will automatically update the inventory**
- **Delete a bill**

> ## Inventory

- [Get bills](#get-bill)
- [Get bill](#get-single-bill)
- [Create item](#create-bill)
- [Update item](#update-bill)
- [Delete item](#delete-bill)

## Get bill

> **Get** /bills

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


> Status : 200

#### Sample Response

```json
  {
   "0" : { "_id": "66b721f0bf87251645137c08",
        "item_id": {
            "_id": "66b721b3bf87251645137bf8",
            "name": "Beans",
            "price": 33,
            "stock": 11,
            "createdBy": "66b720bfbf87251645137bde",
            "description": "This is what we use to buy food",
            "createdAt": "2024-08-10T08:15:47.328Z",
            "updatedAt": "2024-08-10T08:16:48.889Z",
            "__v": 0
        },
        "quantity": 7,
        "price": 33,
        "customerName": "Iam hope",
        "paymentStatus": "Unpaid",
        "createdAt": "2024-08-10T08:16:48.887Z",
        "updatedAt": "2024-08-10T08:16:48.887Z",
  }
  },
    {
   "1" : { "_id": "66b721f0bf87251645137c08",
        "item_id": {
            "_id": "66b721b3bf87251645137bf8",
            "name": "Rice",
            "price": 20,
            "stock": 4,
            "createdBy": "66b720bfbf87251645137bde",
            "description": "This is a very quanlity rice",
            "createdAt": "2024-08-10T08:15:47.328Z",
            "updatedAt": "2024-08-10T08:16:48.889Z",
            "__v": 0 
        },
        "quantity": 4,
        "price": 43,
        "customerName": "Smith",
        "paymentStatus": "paid",
        "createdAt": "2024-08-10T08:16:48.887Z",
        "updatedAt": "2024-08-10T08:16:48.887Z",
  }
  }
```
### Possible error message

```json
{
  "errors": [
    {
        "message": "unauthorized"
    },
   {
        "server" : "Internal Server Error"
    }
  ]
}
```

---

## Get Bill

> **GET** /bill/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Param |              | Description |
| ----- | ------------ | ----------- |
| id    | **required** | Item Id  |

## Sample Response

> Status: 200 Ok

```json
    { "_id": "66b721f0bf87251645137c08",
        "item_id": {
            "_id": "66b721b3bf87251645137bf8",
            "name": "Rice",
            "price": 20,
            "stock": 4,
            "createdBy": "66b720bfbf87251645137bde",
            "description": "This is a very quanlity rice",
            "createdAt": "2024-08-10T08:15:47.328Z",
            "updatedAt": "2024-08-10T08:16:48.889Z",
            "__v": 0 
        },
        "quantity": 4,
        "price": 43,
        "customerName": "Smith",
        "paymentStatus": "paid",
        "createdAt": "2024-08-10T08:16:48.887Z",
        "updatedAt": "2024-08-10T08:16:48.887Z",
  }
```

### Possible error messages

```json
  "errors": [
    {
        "message": "unauthorized"
    },
    {
        "message": "bill not found"
    },
   {
        "server" : "Internal Server Error"
    }
  ]
```

---

## Create Bill

> **POST** /bill

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


| Body           |              | Description                                            |
| --------       | ------------ | ------------------------------------------------       |
| name           | **required** | name of the customer                                   |
| quantity       | **required** | how many  quantity the customer want                   |
| item           | **required** | an array thats holds the item id(s) e.g. ["23"]        |
| paymentStatus  | **optional** | payment status, e.g. paid or unpaid                    |


## Sample Response

> Status: 200 Ok

```json
  {     "Message" : "Bill created successfully",
  }
```
### Possible error messages

```json
  "errors": [
    {
        "message": "unauthorized"
    },
    {
        "message": "item does not exist in our record"
    },
    {
        "Message" : "Please input a valid item"
    },
   {
        "server" : "Internal Server Error"
    }
  ]
```
---


## Update Bill

> **PUT** /bill/:id

 Param  |               | Description  |
| ----- | ------------  | -----------  |
| id    | **required**  | bill id      |


| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

# any of the below will be accepted

| Body           |              | Description                                            |
| --------       | ------------ | ----------------------------------------------------   |
| name           | **optional** | name of the customer                                   |
| quantity       | **optional** | how many   quantity the customer want                  |
| item           | **optional** | an array thats holds the item id(s) e.g. ["232sa23"2]  |
| paymentStatus  | **optional** | payment status, e.g. paid or unpaid                    |

#### Sample Response

> Status : 200 Ok

```json
{
  "Message" : "Bill updated  successfully"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
   {
    "message":"Bill does not exist",

  },
  {
    "message": "unauthorized"
  },
```

# Delete Bill


> **Delete** /bill/:id

 Param  |               | Description |
| ----- | ------------  | ----------- |
| id    | **required**  | item id     |


| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


#### Sample Response

> Status : 200 Ok

```json
{
  "Message" : "Bill has been deleted Successfully"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",
  },
   {
    "message":"bill not found",

  },
  {
    "message": "unauthorized"
  },
```


