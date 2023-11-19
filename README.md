# AnywareSoftware  Task 

## Demo

See the live demo of the Wild-Oasis Quiz App: [Demo App](https://ahmed-ayman-anyware-software-task.netlify.app/)

## Contact

If you have any questions or want to get in touch, you can find me on LinkedIn: [in/Ahmed-Ayman](https://www.linkedin.com/in/ahmed-ayman-723605229/)

## Features

### User Signup, Login, Update data, Update Password

- **User Registration**: Users can sign up for your application by providing their email, username, and password. The password is securely hashed using Bcrypt.js before storing it in the database.

- **User Login**: Registered users can log in using their email and password. Upon successful login, a JSON Web Token (JWT) is generated and returned to the client for authentication on protected routes.

### Route Protection with JSON Web Tokens

- **JWT Authentication**: Many routes in your application are protected and require a valid JWT to access. This ensures that only authenticated users can access sensitive or restricted areas of your application.

- **Middleware Integration**: Middleware like `passport` and `jsonwebtoken` are used to validate JWT tokens and authenticate users. Unauthorized access is prevented by verifying the token's authenticity.

- **Error Handling**: If an invalid or expired JWT is presented, appropriate error handling and responses are in place to safeguard your application.

These key features ensure that your application offers a secure and seamless experience for users, with features like authentication, user data management, and route protection.

## Technologies

- Mongoose
- Express
- Bcrypt.js
- Cookie-parser
- Cors
- Dotenv
- Express-mongo-sanitize
- Express-rate-limit
- Helmet
- Hpp
- Jsonwebtoken
- Morgan
- Multer
- Nodemon
- Sharp
- Validator
- Xss-clean


## External Services

This project integrates the following external services:

### 1. [ChatGPT](https://www.openai.com/gpt)

- **Description:** ChatGPT is a language model developed by OpenAI, used for generating UI faces for student profiles.

### 2. [Mockaroo](https://www.mockaroo.com/)

- **Description:** Mockaroo is a tool for generating realistic demo data for testing and development.

### 3. [UI Faces](https://uifaces.co/)

- **Description:** UI Faces is a service that provides avatars for user profiles.

Feel free to visit these links for more information on each service.


## Endpoints

### 1. Users

#### Register a new user

- URL: `/api/user/register`
- Method: `POST`

#### Login

- URL: `/api/user/login`
- Method: `POST`

#### Logout

- URL: `/api/user/logout`
- Method: `GET`

#### UpdatePassword

- URL: `/api/user/updatepassword`
- Method: `PATCH`

#### updateMe

- URL: `/api/user/updateMe`
- Method: `PATCH`

#### Get Current User

- URL: `/api/user/me`
- URL: `/api/user/:id`
- Method: `GET`

#### Get All Users

- URL: `/api/user`
- Method: `GET`

### 2. Cours

#### Get All Courses
- URL: `/api/course`
- Method: `GET`

#### Get a course
- URL: `/api/course/:courseId`
- Method: `GET`

#### create review for the course [for only who have joined to course]
- URL: `/api/course/:courseId/review`
- Method: `POST`

#### create announcement for the course
- URL: `/api/course/:courseId/announcement`
- Method: `POST`


### 3. announcement

#### create announcement for the course (protected for only the instructor)
- URL: `/api/announcement`
- Method: `POST`

#### Update announcement for the course (protected for only the instructor)
- URL: `/api/announcement/:`
- Method: `POST`

#### Delete announcement for the course
- URL: `/api/announcement/announcementId`
- Method: `DELETE`

#### get all announcement [for just courses that user has joined]
- URL: `/api/announcement`
- Method: `GET`
