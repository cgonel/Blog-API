Fill the env values in the sample file.

To run the application: `npm run start`

To set a common password for your users and populate the password column of your database, you can run the function found in `login\login.service.js` which uses 12 salt rounds: `setUserPassword('passwordChosen')`

<h2>Routes</h2>

To update a comment, use the route: `PATCH /posts/:postId/comments/:commentId`

To delete a comment, use the route: `DELETE /posts/:postId/comments/:commentId`

<h2>Testing</h2>

The two routes covered in the unit and end to end tests are:

<ul>
    <li>
        POST /login
        <ol>
            <li>Should be able to login with correct credentials and return a token</li>
            <li>Should not be able to login with incorrect username and return appropriate error code</li>
            <li>Should not be able to login with incorrect password and return appropriate error code</li>
        </ol>
    </li>
    <br>
    <li>
        PATCH /posts/:id
        <ol>
            <li>Should be able to update a post you own</li>
            End to end tests only:
            <li>Should not be able to update a post which you don't own and return appropriate error code</li>
            <li>Should not be able to update a post if not authenticated and return appropriate error code</li>
        </ol>
    </li>
</ul>

<strong>Note:</strong> The tests for these routes use the environnement variable `USERS_PASS` against the password stored in your database.

To run the tests: `npm run test`
