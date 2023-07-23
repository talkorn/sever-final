# Business Cards Node.js Project

This is a Node.js project for managing business cards. It provides RESTful APIs using Express.js framework and utilizes various libraries such as bcryptjs, joi, jsonwebtoken, config, morgan, cors, chalk, and mongoose.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (version >= 12)
- MongoDB

### Installation

1. Install the dependencies:

   ```
   npm install
   ```

2. Set up the database:

   - Update the Atlas connection in the production file (`config/production.json`) with your MongoDB Atlas URL.

3. Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be purple with the message:
  server run on: http://localhost:8181/.

## API Endpoints

The following API endpoints are available:

### User Routes

#### - Create a new user

POST api/users

request:
name:{first,last},phone,email,password,address:{country,city,street,houseNumber},biz

allow:
name{middle},address:{state,zip}image:{url,alt},web

#### - User login and authentication.

POST api/users/login

You will need to provide a token to get an answer from this api

request:
email, password

#### -Get all users

GET api/users

You will need to provide a token to get an answer from this api

\*\* must be registered as admin

#### - Get a user by ID.

GET api/users/:id

You will need to provide a token to get an answer from this api

\*\* must be registered as admin or registred user

#### - Update a user by ID.

PUT api/users/:id

You will need to provide a token to get an answer from this api

\*\* must be registred user

request:
name:{first,last},phone,email,address:{country,city,street,houseNumber},biz

allow:
name{middle},address:{state,zip}image:{url,alt},web

#### - Update the "isBusiness" field of a user by ID.

PATCH api/users/:id

You will need to provide a token to get an answer from this api

\*\* must be registred user

request:
isBusiness

#### - Delete a user by ID.

DELETE api/users/:id

You will need to provide a token to get an answer from this api

\*\* must be registered as admin or registred user

### Card Routes

#### - Create a new card.

POST /api/cards

You will need to provide a token to get an answer from this api

\*\* must be registered as business

request:
title,subTitle,description, address:{country,city, street,houseNumber}, phone, email

allow: address:{state, zipCode}, web ,image{url,alt}

#### - Get all cards.

GET /api/cards

#### - Get all cards belonging to the authenticated user.

GET /api/cards/my-cards

You will need to provide a token to get an answer from this api

\*\* must be registred as created user

#### - Get a card by ID.

GET /api/cards/:id

#### - Update a card by ID.

PUT /api/cards/:id

You will need to provide a token to get an answer from this api

\*\* must be registred created user

request:
title,subTitle,description, address:{country,city, street,houseNumber}, phone, email url, alt

allow: address:{state, zipCode}, web ,image{url,alt}

#### - Update the "likes" field of a card by ID.

PATCH /api/cards/:id

You will need to provide a token to get an answer from this api

\*\* must be registred user

#### - Delete a card by ID.

DELETE /api/cards/:id

You will need to provide a token to get an answer from this api

\*\* must be registered as admin or registred created user

#### - Generate a new business number for a card by ID.

PATCH /api/cards/biz/:id

You will need to provide a token to get an answer from this api

\*\* must be registered as admin
