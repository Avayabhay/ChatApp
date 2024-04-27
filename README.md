# ChatApp
This is full MERN stack chat App. This App uses Express for the Back-end, MongoDB for Database &amp; React for front-End

# Front End
FrontEnd
    created the App using vite

# BackEnd
BackEnd
    Installed:
        - express - For the backend Server
        - nodemon   - For continous reload and development
        - mongoose - For Data Base
        - socket.io - For Dynamic messages
        - bcrypt - For Password Encryption
        - cookie-parse - For parsing cookies.
        - dotenc - For accessing environment variables
        - jsonweboken - For creating jwt token    


    - Created Routes folder to store all the routes in it. The routes are implemented using express.Router.
    - Also, for good quality and clean code, create controllers to handle the routes neatly.

    Note : First we were using "require" to include the modules but now we are using 'import' and to do so,
    we need to change the 'type' in package.json file to 'module'.

    Note: Also we need to import the js file(that we have created) by using the full name along with extension. If exts are not
    included we get and error.


# Database
    - For this Application, we are using MongoDB as the Database.
    - To start with MongoDB,
        - goto the MongoDB.com
        - create Account
        - create a project
        - copy the password while creating the project
        - copy the mongoDB_URI and paste it into the .env file (also replace the <password> with the actual 
            password)
        - create an async function calling mongoose.connect() with the MONGO_DB_URI as agrs.
    If there are no error, it will be connected to the Database.

    - For the Data to be stored in DB, we need to create Models of the data.
     