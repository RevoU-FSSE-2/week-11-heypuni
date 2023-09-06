# A Recipe Book as Week 11 Project
Welcome to the Recipe Book web application! This application allows users to discover, create, and manage recipes. It includes user registration, 
login functionality, and Role-Based Access Control (RBAC) to manage user roles.

## Features 
- User Registration: Users can create an account with a unique username and password.
- User Login: Registered users can log in securely using their credentials.
- Role-Based Access Control (RBAC): The application includes different user roles such as Admin and User, each with different privileges.
- Recipe Management: Users can create, edit, delete, and view their recipes.


## API Endpoints

GET /localhost:3000/users : Get a list of users. (Admin only)
GET /localhost:3000/users/:uuid : Get a user by ID. (Admin only)
POST /localhost:3000/users : Register.
DELETE /localhost:3000/users/:uuid : Log Out.
GET /localhost:3000/recipes : Get a list of all recipes.
GET /localhost:3000/recipes/:uuid : Get a list of a recipe with its ingredients and steps to make.
POST /localhost:3000/recipes : Post a recipe 
PATCH /localhost:3000/recipes/:uuid : Edit a recipe
DELETE /localhost:3000/recipes/:uuid: Delete a recipe

![Endpoints list 1](/images/api%20endpoints%201.png)
![Endpoints list 2](/images/api%20endpoints%202.png) 

Here's the [link](https://week-11-heypuni-production.up.railway.app) to the project

Deployed using railway.