# User Access Level Module

This project is a Node.js application built with Express.js and MongoDB (using Mongoose) that implements a User Access Level module. It provides authentication, authorization, and access control for different user roles, allowing access to specific pages based on the user's role.

## Development Stack

- Node.js
- Express.js
- MongoDB (Mongoose)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/user-access-level-module.git
```

2. Install dependencies:

```bash
  cd user-access-level
  npm install
```

3. Set up your environment variables:

Create a .env file in the root directory and configure the following variables:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-access-level
JWT_SECRET=yourjsonwebtokensecret
```

4. Start the server:

```bash
npm start
```

5. Testing

Export file postman collection on folder 'collection'

## Deployed API

- https://user-access-level-fwamj5bl9-aldo-tri-pangestus-projects.vercel.app
