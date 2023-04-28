const express = require ("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const connectDB = require("./db");
const loginRoutes = require("./routes/login")
const authRoutes = require("./routes/auth.js")


require("dotenv").config();

const port = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:8080",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));
app.use(
    cookieSession({ name: "session", keys: ["guvi"], maxAge: 24 * 60 * 60 * 100 })
  );
app.use(passport.initialize());
app.use(passport.session());

// Sessions

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
      }))

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});

// Passport Configuration
 require('./passport')(passport)

// Database Connection

connectDB();

// Routes

app.use('/',loginRoutes )
app.use('/auth',authRoutes )

