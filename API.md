# Routes

## Auth


### **POST** /auth/register
- Description : Register a new user in the database and returns the authentication token for said user
- Body : The new user to be created
- Response : 
    - 201 : user created
        - Body : authentication token for the user that was just created
    - 400 : New user data is invalid
    - 409 : Email used for the new user was already in use


### **POST** /auth/login
- Description : Verifies user's credentials and returns an authentication token if they are valid
- Body : The user's credentials
- Parameters : 
    - email (query) : the user's email
    - password (query) : the user's password
- Response :
    - 200 : User authenticated
        - Body : Authentication token
    - 400 : Invalid query data for credentials
    - 401 : Invalid credentials


### **GET** /auth/me
- Description : Returns the user corresponding to the query's token
- Parameters :
    - user (header) : authenticated user
- Response : 
    - 200 : Success
        - Body : The authenticated user
    - 401 : The user isn't authenticated



## Categories


### **GET** /categories
- Description : Returns all the existing categories
- Response : 
    - 200 : Success
        - Body : An array containing all of the existing categories


### **GET** /categories/:id
- Description : Returns the category corresponding to the provided id
- Parameters : 
    - id (path) : the id provided for the search
- Response : 
    - 200 : Success
        - Body : The corresponding category
    - 400 : Invalid id
    - 404 : category not found



## Recipes


### **GET** /recipes?categoryId=&authorId=&search=&ingredient=&maxPrepTime=
- Description : Returns all the recipes, or, if one or multiple query parameters are provided, a filtered list of the existing recipes.
- Parameters (filter by):
    - categoryId (query) : The id of a category
    - authorId  (query) : The id of an author
    - search (query) : Search the title and description of all the existing recipes
    - ingredient (query) : Filter by recipes containing ingredient name
    - maxPrepTime (query) : Filter by a max prep time
-  Response : 
    - 200 : Success
        - Body : An array of all of the recipes, or only with those corresponding to the query's filter


### **GET** /recipes/:id
- Description : Returns the recipe corresponding to the provided id
- Parameters : 
    - id (path) : The provided id
- Response
    - 200 : Success
        - Body : The corresponding recipe
    - 400 : Invalid Id
    - 404 : Recipe not found


### **POST** /recipes
- Description : Creates a new recipe (authenticated user)
- Body : The new recipe to be created
- Response
    - 201 : Recipe created
        - Body : The newly created recipe
    - 400 : Invalid recipe or unknown category
    - 401 : The user is not authenticated
    - 500 : Internal Server Error


### **PUT** /recipes/:id
- Description : Replaces a recipe by the provided one (author or admin)
- Parameters :
    - id (path) : The provided id for the recipe to be replaced
- Body : The new recipe that's going to replace the old one
- Response :
    - 204 : Success
    - 400 : Invalid id or recipe
    - 401 : The user is not authenticated
    - 403 : The user is neither the author of the recipe, nor an admin
    - 404 : The recipe to be replaced can't be found
    - 500 : Internal Server Error


### **PATCH** /recipes/:id
- Description : Replaces some fields of an existing recipe
- Parameters :
    - id (path) : The provided id for the recipe to be replaced
- Body : One or multiple updated fields for the recipe
- Response : 
    - 200 Success
        - Body : The updated recipe
    - 400 : Invalid updated fields for the recipe or invalid id
    - 401 : The user isn't authenticated
    - 403 : The user is neither the author of the recipe, nor an admin
    - 404 : The recipe to be updated can't be found


### **DELETE** /recipe/:id
- Description : Deletes a recipe (author or admin)
- Parameters : 
    - id (path) : The id of the recipe to be deleted
- Response :
    - 204 : Success
    - 400 : Invalid id
    - 401 : The user is not authenticated
    - 403 : The user is neither the author of the recipe, nor and admin
    - 404 : The recipe can't be found



## Users

### **GET** /users
- Description : Returns all the users (admin)
- Response : 
    - 200 : An array of all of the existing users

### **GET** /users/me/favorites
- Description : Returns the favorite recipes of the authenticated user
- Response :
    - 200 : An array of the favorite recipes of the user
    - 401 : The user isn't authenticated

### **PUT** /users/me/favorites/:recipeId
- Description : Adds a recipe to the 'favorites' list of the authenticated user
- Parameters :
    - recipeId (path) : The id of the recipe to be added
- Response : 
    - 204 : Success
    - 400 : Invalid id
    - 401 : The user is not authenticated
    - 404 : The recipe can't be found
    - 500 Internal server error

### **DELETE** /users/me/favorites/:recipeId
- Description : Deletes a recipe from the authenticated user's favorite recipes list
- Parameters : 
    - recipeId (path) : The id of the recipe to be removed
- Response :
    - 204 : Success
    - 400 : Invalid id
    - 401 : The user isn't authenticated
    - 500 : Internal Server Error

### **GET** /users/:id
- Description : Gets complete info of a user for the user themselves or an admin, or limited infos if requesting another user
- Parameters : 
    - id (path) : The id of the user to be researched
- Response :
    - 200 : Success
        - Body : (If admin or a user requesting themselves) Comlete informations of the user
        - Body : (If requesting another user) Limited informations of the user
    - 400 : Invalid id
    - 401 : The user is not authenticated
    - 404 : The user can't be found

### **DELETE** /users/:id
- Description : Deletes a user (admin only, no self-delete)
- Parameters : 
    - id (path) : The id of the user to be deleted
- Response : 
    - 204 : Success
    - 400 : Invalid id or self-deletion attempt
    - 401 : Unauthenticated user
    - 403 : The authenticated user is not an admin
    - 404 : The user to be deleted can't be found
    - 500 : Internal Server Error