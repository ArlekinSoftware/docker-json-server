## Table of contents

<details>

<!-- toc -->

- [Desription](#description)
- [Usage](#usage)
    * [Routes](#routes)
    * [Environments](#environments)
- [Dependencies](#dependencies)
    

<!-- tocstop -->

</details>

## Description
Node based fake data server with JWT auth

**NOTE**: Never use it in production

## Usage
### Routes
Main route for auth key generation:
```
    /auth/login
``` 
All other routes would be included from [schema](https://github.com/typicode/json-server#routes)

### Environments
* **JSON_SCHEMA_PATH** - path to schema inside container. 
<br>[More info about schema](https://github.com/json-schema-faker/json-schema-faker)
* **PROTECTED_ROUTES** - path to routes that you want to secure with jwt<br>
**Example**:
```json
[
  "users",
  "posts",
  "other-secure-route"
]
```
**NOTE**: all routes you want to secure should be specified as [routes in json-server](https://github.com/typicode/json-server#routes).  
    
* **JWT_SECRET_KEY** - random secret key
* **JWT_EXPIRES_IN** - lifetime of secret key

## Dependencies
* [json-server](https://github.com/typicode/json-server)
* [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker)
* [faker.js](https://github.com/marak/Faker.js)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)