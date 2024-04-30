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

    
# JWT
    JWT - JSON Web Token
    JWT is imported from the jsonwebtoken library in express js
    We need to create a token and to do so, we need to call the jwt.sign(), which takes the following args:
        1. payload - here we will pass the userID for our app
        2. secret_key - it will be used to sign the token, its will be stored in the .env file
        3. options: inlcudes various options such as expiresIn, etc.

    once the  token is created, we set it as a cookie in the response using:
        res.cookie("jwt",token, { maxAge : ..})
        here the 1st arg is the name of the cookie ad second is the token and third is the options which inlcudes maxAge and other options


# Login

    login flow :  We need to send the userName and password to the API using post methos. After receiving the userNmae and password, we call the findOne({userName}) to see if there is any such user present.
    Note : we do User.findOne(), where User is the Model

    if we get the user, we compare the password using brcypt.compare(), where 1st arg is the entered password and 2nd is the hashed password(received from the database).

    if both matches, we generate and set the 'jwt'(using the earlier method) in the cookie and send back the response.

# Logout

    logout is simeple - in this API, we just clear the token by setting it to empty and maxAge to 0 followed by sending the response


# Designing the chat APP
    Our Chat will have 2 models :
        1. Message :
            fields :
                - id - automatically generated by mongoDB
                - sender_id 
                - receiver_id - we can make it an array in future to support group msgs
                - message - the actual msg

        2. Conversation :
            fileds:
                - id - automatically generated by mongoDB
                - participants [] - array contains ids of all the participants
                - message [] - array containing the id of all the messages in the conversation.

    
    Note: When we create the any schema say messageSchema, we put sender_id as one of the fields. Now the sender_id is going to be a type of id. we can say:
    type: mongoose.Schema.Types.ObjectId,
    ref : "User",
    here, ObjectId is a special type that say that it is a refernce id from the 'User' Model

    Note: when using mongoose.Schema() to create a  schema, we can put {timestamp : true} as the 2nd arg, it will say that whenever the data is create, it will automatically created the timestamp of the data i.e, when the data was created and updated.


# Messaging Routes

    Send Message:
        we create an API using post method, in which we will be getting id and message from the req.param & req.body.
        Then the sender ID is also need. For this we will create a middleware called proctedRoute, which is authorize and put the user's id in the req.

        In the protectedRoute,
        we get the token from the req.cookie.
        But we wont be able to get the req.cookie.jwt normally. For this, we use cookie-parse. So we import and use the cookie-parse middleware before any routes in the server.js file.
        After getting the token, we verify it, using jwt.verify(token, secret_key).
        the verify method returns the payload, in our case its the sender's user_id.
        
