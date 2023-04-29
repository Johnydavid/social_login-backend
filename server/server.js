const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const connection = require("./db");

const loginRoutes = require("./routes/login")
const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user.js");

const app = express();
require("dotenv").config();

app.use(
  cookieSession({ name: "session", keys: ["guvi"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
const port = Number(process.env.PORT)

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

// Database Connection
connection();

// Routes

app.use("/", loginRoutes )
app.use("/auth", authRoutes )
app.use("/api/users", userRoutes);