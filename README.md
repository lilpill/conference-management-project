# Conference Management System

This is a Node.js-based conference management system that allows users to manage conferences, submit papers, review submissions, and more. The backend is powered by MongoDB (using Mongoose) and implements role-based access control.

## Table of Contents
- Features
- Installation
- Setup
- Running the Application
- Testing Scenarios
- API Documentation

## Features
- User authentication and role-based authorization
- Manage conferences and papers
- Assign PC Chairs and PC Members to conferences
- Submit, review, and approve/reject papers
- Role management: USER, AUTHOR, PC_CHAIR, PC_MEMBER, ADMIN

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/lilpill/conference-management-project.git
   
   cd conference-management-project
   ```

2. **Install the dependencies:**

   ```
   npm install
   ```

3. **Setup environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/conference-management
   JWT_SECRET=your_secret_key_here
   ```

## Setup

1. **Configure MongoDB:**
   Ensure MongoDB is installed and running on your local machine or provide a connection string to a MongoDB instance.

2. **Configure environment variables:**
   Ensure all required environment variables are set in the `.env` file.

## Running the Application

Start the application by running:

   ```
   npm start
   ```

The server should be running on http://localhost:3000

## Testing Scenarios

Here are some example scenarios you can test using Postman or cURL:

### 1. User Registration

- **Endpoint:** POST /users/register
- **Request Body:**
  
  ```
  {
    "username": "admin",
    "password": "AdminPass123!",
    "fullName": "Admin User",
    "role": "ADMIN"
  }
  ```

- **Expected Outcome:** A new user is created with the role of `ADMIN`.

### 2. User Login

- **Endpoint:** POST /users/login
- **Request Body:**

  ```
  {
    "username": "admin",
    "password": "AdminPass123!"
  }
  ```

- **Expected Outcome:** The server returns a JWT token.

### 3. Create a Conference

- **Endpoint:** POST /conferences
- **Headers:**
  - Authorization: Bearer <your_jwt_token>
- **Request Body:**

  ```
  {
    "name": "Tech Conference 2024",
    "description": "Annual technology conference."
  }
  ```

- **Expected Outcome:** A new conference is created.

### 4. Submit a Paper

- **Endpoint:** POST /papers
- **Headers:**
  - Authorization: Bearer <your_jwt_token>
- **Request Body:**

  ```
  {
    "title": "Innovative Research on AI",
    "abstract": "This paper explores...",
    "content": "The content of the paper...",
    "conferenceId": "<conference_id>"
  }
  ```

- **Expected Outcome:** A new paper is submitted to the conference.

### 5. Assign a Reviewer

- **Endpoint:** PUT /papers/:id/assign-reviewer
- **Headers:**
  - Authorization: Bearer <your_jwt_token>
- **Request Body:**

  ```
  {
    "reviewerId": "<user_id>"
  }
  ```

- **Expected Outcome:** The selected user is assigned as a reviewer to the paper.

### 6. Review a Paper

- **Endpoint:** PUT /papers/:id/review
- **Headers:**
  - Authorization: Bearer <your_jwt_token>
- **Request Body:**

  ```
  {
    "review": "This is a comprehensive review of the paper...",
    "score": 4
  }
  ```

- **Expected Outcome:** The paper is reviewed with a score.

## API Documentation

### Users

- `POST /users/register`: Register a new user.
- `POST /users/login`: Login and obtain a JWT token.
- `PUT /users/update`: Update the logged-in user's details.
- `PUT /users/update-password`: Update the logged-in user's password.
- `PUT /update-status/:id`: Update the status of a user (ADMIN).
- `DELETE /delete/:id`: Delete a user (ADMIN, USER).

### Conferences

- `GET /conferences`: Retrieve all conferences.
- `GET /conferences/:id`: Retrieve conference by ID.
- `POST /conferences`: Create a new conference (USER).
- `PUT /conferences/:id`: Update a conference by ID (PC_CHAIR).
- `PUT /confereneces/:id/state`: Update conference state (PC_CHAIR).
- `PUT /confereneces/:id/pcc`: Update conference state (PC_CHAIR).
- `PUT /confereneces/:id/pcm`: Update conference state (PC_CHAIR).
- `DELETE /conferences/:id`: Delete conference by ID (PC_CHAIR).

### Papers

- `POST /papers/`: Submit a new paper (AUTHOR).
- `PUT /papers/:id`: Update an existing paper (AUTHOR).
- `PUT /papers/:id/submit`: Submit a draft paper to a conference (AUTHOR).
- `PUT /papers/:id/final-submit`: Final submission of a paper to a conference (AUTHOR).
- `PUT /papers/:id/add-coauthor`: Add a coauthor to a paper (AUTHOR).
- `DELETE /papers/:id`: Withdraw a paper from a conference (AUTHOR).
- `PUT /papers/:id/review`: Submit a review for a paper (PC_MEMBER, PC_CHAIR).
- `PUT /papers/:id/assign-reviewer`: Assign a reviewer to a paper (PC_CHAIR).
- `PUT /papers/:id/approve`: Approve a paper for a conference (PC_CHAIR).
- `PUT /papers/:id/reject`: Reject a paper for a conference (PC_CHAIR).
- `PUT /papers/:id/accept`: Accept a paper for presentation (PC_CHAIR).
- `GET /papers/`: Retrieve all papers (Any authenticated user).
- `GET /papers/:id`: Retrieve a specific paper by ID (Any authenticated user).
- `GET /papers/search`: Search for papers based on criteria (Any authenticated user).
