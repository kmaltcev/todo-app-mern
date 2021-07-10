const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const notes = require('./routes/api/notes');
const cookieParser = require('cookie-parser');
const oAuthController = require('./routes/auth');
const expressSession = require('express-session');
const isAuth = require('./passport/middlewareAuth');

const db = require("./config/keys").mongoURI;
const app = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
app.use(bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

// Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require("./passport/combine")(passport);
// Routes
app.use('/auth', oAuthController);
app.use("/api/users", users);
app.use("/api/notes", isAuth, notes);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));