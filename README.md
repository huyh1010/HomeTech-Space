<h1 align="center">Hi 👋, I'm Huy Huynh</h1>
<h3 align="center">A passionate Full Stack developer from Vietnam</h3>

<h3 align="left">Connect with me:</h3>
<p align="left">
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> </p>

# Hometech Space - Smart Home Electronic E-Commerce MERN stack

## Application Description

• This application offers a wide range of affordable smart home devices products at the moment where electronic equipments are unaffordable out of reach for the majority of consumers.

• It is designed to help people buy electronic goods at a low-cost price. The application predominantly specializes in smart home devices only which allow customers to find these products easily without having to search the key term "smart home devices" or "smart electronic home appliances" when they are browsing on a similar application. The application also offers a bundle options; customer can select these bundle which consists of multiple electronic products rather than select each product at a time.

• This application provides a list of home device products labeled and grouped based on their category. User will automatically see a displayed UI feature of the product categorization which helps enhance their shopping experience. In each category, the application also provide a filtering section based on the product specification (ex: price, brand name, size, dimension or weight...).

• This application also provides a webpage feature which display a list of grouping products (from different category) in a bundle at a reasonable price to allow the user to select and purchase without having to browse through other product webpage based on their category.

• While the HomeTech Space does provide a viable choice for user to browse through products, we hope to implement a "popular section" feature to allow customer to look at the platform's best-selling product. We also hope to build a customization webpage feature that allows user to select their product from scratch. While our bundle options does provide somewhat similar feature, the products in the bundle are pre-selected by the store and user are not allowed to adjust and select their own preferred product in the bundle. It would be amazing to also include a customer's review section for product reviews.

## User Story

### Background

• HomeTech Space is an electronic e-commerce site that allow customers to browse and purchase product of various categories offered. User should be able to explore the products based on the categories alongside with the filtering options that help narrow down user's ideal product.

• (All users) should be able to sign up, log in, and log out of the market application with appropriate role.

• (Each user) should be able to view the browse and view the product catalog and detail as a guest (without signing in). User can select the product with and add to cart without registering or signing in.

• (Registered user) should be able to browse through the product catalog, view product details, and add products to cart. Most importantly, they can also **check out securely with Cash On Delivery options, view order history, track order updates, and cancel orders**.

• (Only Admin) can create and manage (update, remove) product listings, including details such as title, description, price, and images ...etc.

• Admin should receive order and update the delivery status of the order (triggers automated notifications to be sent to the customers).

• Admin should have a dashboard page where they can view key information such as product inventory, total registered customers, total revenue...etc. They can also view and filter total orders by status.

### Authentication

• [ ] As a user, I can sign in with my email and password.

• [ ] As a user, I can register for a new account with email and password.

• [ ] As a user, I can stay signed in after refreshing the page.

### Users

• [ ] As a user, I can see my current profile info (name, email address, password, and role).

• [ ] As a user, I can update my profile (Avatar, Address, Phone Number).

### Products

• [ ] As a user, I can see a list of products

• [ ] As a user, I can add a product to my cart.

• [ ] All products should contain information => name, description, price, and category.

• [ ] As a user with role 'admin', I can add a new product to the list.

• [ ] As a user with role 'admin', I can update and remove a product.

### Product Bundles

• [ ] As a user, I can see a list of product bundles.

• [ ] As a user with role 'admin', I can add a new bundle.

• [ ] As a user with role 'admin', I can update or remove a bundle.

### Categories

• [ ] As a user, I can see a list of categories- contains products that are related to that category.

• [ ] As a user with role 'admin', I can add a new category to the list.

• [ ] As a user with role 'admin', I can update or remove category name.

### Orders

• [ ] As a user, I can check out my order

• [ ] As a user, I can see my order information and status.

• [ ] As a user, I can cancel my order.

• [ ] As a user with role 'admin', I can see all orders.

• [ ] As a user with role 'admin', I can update the status of the order.

### Payment

• [ ] As a user, I can see the payment status and amount.

• [ ] As a user with role admin, I can update the status of payment.

## API endpoints

### Auth APIs

```javascript
/**
 * @route POST /auth/login
 * @description Log in with username and password
 * @body {email, password}
 * @access Public
 */
```

### User APIs

```javascript
/**
 * @route POST /users
 * @description Register new user
 * @body {name, email, password}
 * @access Public
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

### Product APIs

```javascript
/**
 * @route GET /products
 * @description Get a list of products
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route POST /products
 * @description Create a new product
 * @body {name, price, category, brand, dimension/size, weight, description, imageUrl, key features}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route GET /products/:id
 * @description Get a single product by ID.
 * @param {id}
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /products/:id
 * @description Update a product.
 * @param {id}
 * @body {name, price, category, brand, dimension/size, weight, description, imageUrl, key features}
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
 * @body {name, products, imageUrl, description}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route GET /bundles
 * @description get all bundles
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route GET /bundles/:id
 * @description Get a single bundle by ID.
 * @param {id}
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /bundles/:id
 * @description Update product bundle
 * @param {id}
 * @body {name, products, imageUrl, description}
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
 * @body {name, products}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route GET /categories
 * @description Create a list of categories
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route GET /categories/:id
 * @description Get single category (*note: with arrays of products)
 * @param {id}
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /categories/:id
 * @description Update a single category by name
 * @param {id}
 * @body {name}
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

### Order APIs

```javascript
/**
 * @route POST /orders
 * @description Create an order
 * @body {buyer, products, shipping address, payment method, status}
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
 * @route GET /orders/:id
 * @description Get an order
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /orders/:id
 * @description Update an order
 * @body {status}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route DELETE /orders/:id
 * @description Cancel an order
 * @body {status}
 * @access Login required, admin only
 */
```

### Payment APIs

```javascript
/**
 * @route POST /payments
 * @description Create a payment
 * @body {order, status}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route GET /payments
 * @description Get all payment
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route GET /payments/:id
 * @description Get a payment
 * @param {id}
 * @body
 * @access Login required
 */
```

```javascript
/**
 * @route PUT /payments/:id
 * @description Update payment status
 * @param {id}
 * @body {status}
 * @access Login required, admin only
 */
```

```javascript
/**
 * @route DELETE /payments/:id
 * @description Delete a payment
 * @param {id}
 * @body
 * @access Login required, admin only
 */
```

Entity Relationship Diagram

![Entity Relationship Diagram](C:\Users\Huy\OneDrive\Desktop\Final Porject -BE\Entity Relationship Diagram [MConverter.eu].png "Entity Relationship Diagram")
