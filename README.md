# Less-Ego Blog

Less-Ego Blog is a MERN (MongoDB, Express.js, React, Node.js) application designed to keep people inspired and informed about the latest trends. With user-friendly authentication options and intuitive features, users can stay engaged by posting comments, editing profiles, and exploring content seamlessly. And it's also a platform where i'll be posting about my tech activities and Journey.

## Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Usage](#usage)
* [Challenges](#challenges)
* [How to Run This Project](#how-to-run-this-project)
* [Technologies Used](#technologies-used)
* [Live Demo](#live-demo)
* [Contributing](#contributing)
* [License](#license)

## Introduction

Less-Ego Blog is built to inspire users by keeping them updated with the latest trends across various domains. This blog provides a platform for users to sign up or sign in, post comments, and manage their profiles. With modern authentication methods like Google Auth (via Firebase), users can engage effortlessly.

## Features

- **User Authentication**:
  - Sign up and sign in using email and password.
  - Google authentication implemented via Firebase for seamless access.
- **User Functionality**:
  - Post comments and interact with blog posts.
  - View and edit user profiles.
  - Manage account information.
- **Admin Functionality**:
    Perform CRUD operation on posts,comments and users
- **Form and Google Auth Options**: Users can perform actions through a traditional form or Google sign-in.
- **Secure JWT Authentication**: Protects user sessions and enables secure API communication.
- **Redux for State Management**: Handles global application state efficiently.
- **Responsive Design**: Optimized for devices of all sizes, with the help of tailwind css.
- **Animation**: Makes use of framer motion to animate banner texts

## Usage

1. **Sign Up/Sign In**:
   - Register using an email and password or log in with Google Auth.
2. **Interact with Posts**:
   - Comment on blog posts to share your thoughts.
3. **Profile Management**:
   - View and edit your profile details conveniently.

## Challenges

- **Authentication Security**: Ensuring secure token-based authentication using JWT.
- **Firebase Integration**: Smooth integration of Google Auth for a flawless user experience.
- **Scalability**: Designing a structure that supports future enhancements.
- **Responsive UI**: Creating an engaging interface adaptable to all screen sizes.

## How To Run This Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/LesegoLSG/blog.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd client for frontend and cd server for server
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## Technologies Used

- **MongoDB**: NoSQL database for storing user data and comments.
- **Express.js**: Backend framework for handling API routes.
- **React**: Frontend library for building an interactive user interface.
- **Node.js**: Runtime environment for executing JavaScript server-side.
- **Redux**: State management library for predictable application state.
- **Firebase**: Used for Google Authentication.
- **JWT**: Ensures secure user authentication.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Adds animations for an enhanced user experience.

## Live Demo

```
https://bloglessego.onrender.com/
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature
   ```
5. Create a pull request.

## License

This project is a personal portfolio project and is not intended for commercial use or distribution. All rights reserved by the author.
