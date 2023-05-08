const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const connection = require("./db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json());
require("dotenv").config();

app.use(
  cookieSession({ name: "session", keys: ["guvi"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("secretcode"));

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://guvi-socialmedia.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*" );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

// Database Connection
connection();

// Routes

app.use("/auth", authRoutes);
