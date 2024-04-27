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
    - For creating a model, we first create a schema using mongoose.Schema(), and then we create a model
    from that schema using mongoose.model("name", <Schema>).

    -User Model
        - fulname
        - username
        - password
        - gender
        - profilePic

    Note: To get the {fullname, username, pass,etc} from the req.body, we need to use a middleware -> express.json()

    Sign Up Complete flow:
        - user fills the form and sends a post request with all the fields
        - get the values for username pass, etc from the req.body (note: for this we need to use express.json() middleware)
        - check if the pass and confirm pass are same
        - check if the user already exists
        - encrypt/Hash the password(using a brcypt)
        - put a profile pic 
            https://avatar.iran.liara.run/public/girl?username=[value] - this url gives us radom profilepics depending on the username and girl/boy
        - save the user to database

    Note : All the variable name should match the model

    Ecrypting the Password:
        - we use brcypt to hash the pass
        - first create a salt using brcypt.genSalt(10);
        - then hash the pass, brcypt(pass, salt) 