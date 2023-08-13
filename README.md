<h1 align="center">Hi 👋, I'm Huy Huynh</h1>
<h3 align="center">A passionate Full Stack developer from Vietnam</h3>

<h3 align="left">Connect with me:</h3>
<p align="left">
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> </p>

# Hometech Space - Smart Home Electronic E-Commerce MERN stack

# Table of contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [API endpoints](#api)
4. [Entity Relationship Diagram](#erd)

## <a name="Introduction">Introduction</a>

• This Back End Application provides a RESTFUL API to suppport the <a href="https://github.com/huyh1010/HomeTech-Space-FE" target="_blank">HomeTech-Space Front End Application</a> with the following guidance: endpoints information (ex: description and instruction for each route) and an Entity RelationShip Diagram depicts the relationship between database schema.

## <a name="Installation">Installation</a>

To have this app running on your local computer, please follow the below steps:

Clone repository

```javascript
$ git clone https://github.com/huyh1010/HomeTech-Space.git
```

Navigate to the project folder:

```javascript
$ cd HomeTech-Space
```

Install project dependencies:

```javascript
$ npm install
```

Set up environment variables (The following information can be found in the .env.example file):

![Screenshot 2023-08-13 105825](https://github.com/huyh1010/HomeTech-Space/assets/117617750/7982bd6e-3b6e-421a-ae8a-709a31415576)

PORT

```javascript
$ PORT = 8000
```

MONGODB_URI

1. Install MongoDB Compass from <a href="https://www.mongodb.com/try/download/compass" target="_blank">here</a>
2. Once you open Compass, an initial connection dialog appears:
   ![Screenshot 2023-08-13 112104](https://github.com/huyh1010/HomeTech-Space/assets/117617750/85a6ed46-0d70-4fd7-a950-2d0fc7f9856d)
3. In the URI, enter a connection string and click connect. For now, enter the following information for your connection string: mongodb://localhost:27017 (local database). Enter this string as the variable for MONGODB_URI:

```javascript
$ MONGODB_URI = 'mongodb://localhost:27017'
```

JWT_SECRET_KEY (This can be anything)

Example:

```javascript
$ JWT_SECRET_KEY = 'fjkslaoq;ls'
```

SECRET_SESSION_KEY (This can be anything)

Example:

```javascript
$ SECRET_SESSION_KEY = 'fjkslaoq;ls'
```

GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET

The following variable allows user to sign in with Google and receive user information (ex: accessToken).

1. Navigate to <a href="https://www.balbooa.com/gridbox-documentation/how-to-get-google-client-id-and-client-secret" target="_blank">this web</a> and follow the instructions to attain **GOOGLE_CLIENT_ID** & **GOOGLE_CLIENT_SECRET**
2. Once you have both the key, place it into these variables:

```javascript
$ GOOGLE_CLIENT_ID = 'your google client ID'
```

```javascript
$ GOOGLE_CLIENT_SECRET = 'your google client secret'
```

Run the project:

```javascript
$ npm run dev
```

## <a name="api">API endpoints</a>

### Auth APIs

```javascript
/**
 * @route POST /auth/login
 * @description User sign in, create a cart for user if they don't have one
 * @body {email, password}
 * @access Public
 */
```

### AuthPassport APIs (for Google Sign in)

```javascript
/**
 * @route GET /auth/google
 * @description Direct to google page
 
 */
```

```javascript
/**
 * @route GET /auth/google/callback
 * @description Receive user info from Google's response
 
 */
```

```javascript
/**
 * @route GET /auth/google/login/success
 * @description Get user's info after logging in by Google
 
 */
```

```javascript
/**
 * @route GET /auth/google/login/error
 * @description Response if failed to login to Google
 
 */
```

### User APIs

```javascript
/**
 * @route POST /users
 * @description Register new user and create a cart for user
 * @body {name, email, password, cart}
 * @access Public
 */
```

```javascript
/**
 * @route GET /users
 * @description Get All Users
 * @body
 * @access admin only
 */
```

```javascript
/**
 * @route GET /users/data
 * @description Get Users' Data
 * @body
 * @access admin only
 */
```

```javascript
/**
 * @route GET /users/me
 * @description Get current user info
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route GET /users/me
 * @description Get current user info
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route GET /users/:id
 * @description Get user info
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /users/:id
 * @description Update user info
 * @param {id}
 * @body {name, avatarUrl, address, phone}
 * @access Login required
 */
```

### Product APIs

```javascript
/**
 * @route GET /products
 * @description Get a list of products
 * @body
 * @access Public
 */
```

```javascript
/**
 * @route POST /products
 * @description Create a new product
 * @body {name, price, category, brand, dimension/size, weight, description, imageUrl, key features, poster_path}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route GET /products/:id
 * @description Get a single product by ID.
 * @param {id}
 * @access Public
 */
```

```javascript
/**
 * @route PUT /products/:id
 * @description Update a product.
 * @param {id}
 * @body {name, price, category, brand, dimension/size, weight_kg, description, imageUrl, key features, poster_path}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route DELETE /products/:id
 * @description Delete a product.
 * @param {id}
 * @access Login required, admin only
 */
```

### Product Bundle APIs

```javascript
/**
 * @route POST /bundles
 * @description Create a product bundle
 * @body {name, products, description, poster_path, price, imageUrl}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route GET /bundles
 * @description get all bundles
 * @body
 * @access Public
 */
```

```javascript
/**
 * @route GET /bundles/:id
 * @description Get a single bundle by ID.
 * @param {id}
 * @access Public
 */
```

```javascript
/**
 * @route PUT /bundles/:id
 * @description Update product bundle
 * @param {id}
 * @body {name, products, description, poster_path, price, imageUrl}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route DELETE /bundles/:id
 * @description Delete a product bundle.
 * @param {id}
 * @access Login required, admin only
 */
```

### Category APIs

```javascript
/**
 * @route POST /categories
 * @description Create a list of categories
 * @body {name, coverImgUrl}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route GET /categories
 * @description Get all categories
 * @body
 * @access Public
 */
```

```javascript
/**
 * @route GET /categories/:id
 * @description Get a single category
 * @param {id}
 * @body
 * @access Public
 */
```

```javascript
/**
 * @route PUT /categories/:id
 * @description Update a single category by name
 * @param {id}
 * @body {name, coverImgUrl}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route DELETE /categories/:id
 * @description Remove a single category by name
 * @param {id}
 * @body {name}
 * @access Login required, admin only
 */
```

### Cart APIs

```javascript
/**
 * @route PUT /carts
 * @description Update cart
 * @body { id}
 * * @body {cart}
 * @access Public
 */
```

### Order APIs

```javascript
/**
 * @route POST /orders
 * @description Create an order
 * @body { customer_info, cart, user_id, totalPrice }
 * @access Login required
 */
```

```javascript
/**
 * @route GET /orders
 * @description Get all orders
 * @body
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route GET /orders/sales
 * @description Get order sales per week
 * @param
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route GET /orders/user/:user_id
 * @description Get current user order
 * @param (user_id)
 * @access Login required
 */
```

```javascript
/**
 * @route GET /orders/:id
 * @description Get an order
 * @param {id}
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /orders/:id
 * @description Update an order
 * @param {id}
 * @body {status, payment_status}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route DELETE /orders/:id
 * @description Cancel an order
 * @param {id}
 * @body
 * @access Login required
 */
```

## <a name="erd">Entity Relationship Diagram</a>

![erd](https://github.com/huyh1010/HomeTech-Space/assets/117617750/159d56d7-fc96-4e51-a643-1b96cb5ea948)
