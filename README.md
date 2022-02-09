# Blog-API
## Description
This is an API that can be used as a backend service for a blogging platform. It includes authentication using JSON Web Token. <br><br>
The repository contains 2 workflows: one CI pipeline that lints and tests on push, and one CD pipeline that deploys the service to Google Cloud Run. 

## Run locally
1. Fill the environnement variables <br>
**Note**: `USERS_PASS` is used to set a common password for the users when seeding the database.
2. Install the dependencies: `npm install` <br>
3. Connect to your local database <br>
4. Run migrations: `npx sequelize-cli db:migrate` <br>
5. Run seeding: `npx sequelize-cli db:seed:all` <br>
6. Start the app: `npm start`

## API Documentation
### Endpoints

The application exposes the following endpoints:

#### Unauthenticated

- /users to fetch all users
- /login to return an authentication token for the user

#### Authenticated

The following endpoints all process data relevant to the sender's user id

##### Fetching Data

- GET /posts to fetch all posts by a sender
- GET /posts/:id to fetch a single post made by a sender
- GET /posts/:id/comments to fetch all comments about a post
- GET /posts/:id/comments?userId=2 to fetch all comments made by userId 2 about a specific post. ( this should be made generic and not specific to user2)

##### Adding Data

- POST /posts to create a new post
- POST /posts/:id/comments to add a new comment to a post

##### Updating Data

- PATCH /posts/:id to update a post
- PATCH /posts/:postId/comments/:commentId to update a comment

##### Deleting Data

- DELETE /posts/:postId/comments/:commentId to delete a comment
