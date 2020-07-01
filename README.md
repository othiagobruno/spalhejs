<p align="center">
  <img src="./.github/illustration2.svg" width="220" height="220"/>
</p>

# Spalhe

### Backend of a social network in adonis.js

# Technologies

- [Node.Js](https://nodejs.org/en/)
- [Adonis.Js](https://adonisjs.com/)
- [MySQL](https://www.mysql.com/)

# Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/)
- Adonis.Js CLI

# Installing

I'll start with the assumption that you already have the programs installed, but if you don't, just follow the guides on the official websites of [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/) and [MySQL](https://www.mysql.com/)

To install the Adonis CLI, run the following command on your terminal

```
yarn global install @adonisjs/cli
```

# Cloning the repository

To continue cloning this repository on your machine by copying the repository link and running commands below on your terminal

```cmd
git clone https://github.com/{your username}/spalhejs.git
cd spalhejs
adonis install --yarn
```

# Development

With everything installed, we will now go to development, below is the features with their repective methods, answers and errors

## Users

### Store method

Method used to create a new user in the application

URL:

> POST - http://localhost:3000/register

Example request body:

```json
{
  "name": "Jhon Doe",
  "username": "jhon_doe",
  "email": "jhondoe@email.com",
  "password": "Mypassword2"
}
```

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsImlhdCI6MTU5MzQ4NTY0MH0.U55K3AzUjHD9PhdO9Pn6jSkCRbSxfgegaR7JxpW_CnE",
  "user": {
    "id": 1,
    "name": "Jhon Doe",
    "username": "jhon_doe",
    "email": "jhondoe@email.com",
    "avatar": "https://url"
  }
}
```

### Index method

Must return all registered users

URL:

> GET - http://localhost:3000/users

Example response:

```json
[
  {
    "id": 1,
    "name": "Jhon Doe",
    "username": "jhon_doe",
    "email": "assiswesley549@gmail.com",
    "avatar": "https://url",
    "biography": null,
    "private": null,
    "website": null,
    "token": null
  },
  ...
]
```

### Show method

Returns all data for a specific user by passing an id through the url

URL:

> GET - http://localhost:3000/users/{id}

Example response:

```json
{
  "id": 1,
  "name": "Jhon Doe",
  "username": "jhon_doe",
  "email": "jhondoe@email.com",
  "avatar": "https://url",
  "biography": null,
  "private": null,
  "website": null,
  "token": null,
  "followed": null,
  "__meta__": {
    "following_count": "0",
    "followers_count": "0",
    "posts_count": "0"
  }
}
```

### Update method - (Authenticated user)

Responsible for updating authenticated user data

URL:

> PUT - http://localhost:3000/users

Example request body:

```json
{
  "name": "Jhon Doe",
  "username": "jhon_doe",
  "avatar": "https://url",
  "biography": "Lorem ipusm is a simple dummy text",
  "private": null,
  "website": null,
  "token": null
}
```

Example response:

```json
{
  "id": 2,
  "name": "Jhon Doe",
  "username": "jhon_doe",
  "email": "jhondoe@email.com",
  "avatar": "https://url",
  "biography": "Lorem ipusm is a simple dummy text",
  "private": null,
  "website": null,
  "token": null
}
```

---

## Users session

### Store method

Creates a new access token to consume private routes

URL:

> POST - http://localhost:3000/session

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU5MzM5NjQ2NX0.Fmf9OrvqIavUwBg6bvQ1DBRJJFdjs1ow65hO0Zw0Z3Q",
  "user": {
    "id": 1,
    "name": "Jhon Doe",
    "username": "jhon_doe",
    "email": "jhondoe@email.com",
    "avatar": "https://url",
    "biography": null,
    "private": null,
    "website": null,
    "token": null,
    "__meta__": {
      "following_count": "0",
      "followers_count": "0",
      "posts_count": "0"
    }
  }
}
```

---

## Forgot Password

Sends a token email to reset password

URL:

### Store Method

> POST - http://localhost:3000/forgot-password

Example request body:

```json
{
  "email": "jhondoe@email.com"
}
```

#### This method returns only a 200 status as a response

---

## Verify token forgot password

### Verify method

Checks whether a password reset token is valid or not

URL:

Example request body

```json
{
  "email": "jhondoe@email.com",
  "token": "178629"
}
```

Example response:

```json
{
  "token_is_valid": true
}
```

#### If the token form invalid the property token_is_valid will have the value false

---

## Reset Password

Resets the user's password as long as the data sent is valid

URL:

### Store method

> POST - http://localhost:3000/reset-password

Example request body:

```json
{
  "email": "jhondoe@email.com",
  "password": "Mynewpassword3",
  "token": "178629"
}
```

#### This method returns only a 200 status as a response

---
