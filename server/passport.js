const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User");
// const GoogleUser = require("./models/GoogleUser");
// const GithubUser = require("./models/GithubUser");
const FacebookUser = require("./models/FacebookUser");
const passport = require("passport");
require("dotenv").config();
// require('https').globalAgent.options.rejectUnauthorized = false;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      // callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(profile);
      User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
          // If User already created in DB

          console.log(`user is: `, currentUser);
        } else {
          // if user not present then create new user in DB
          new User({
            displayName: profile.displayName,
            id: profile.id,
            // image: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log(`New Google User Created` + newUser);
            });
        }
      });
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      // callbackURL: "https://social-media-login.onrender.com/auth/github/callback",
      callbackURL: "/auth/github/callback",
      // callbackURL: "https://guvi-socialmedia.netlify.app/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(profile);
      User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
          // If User already created in DB

          console.log(`user is: `, currentUser);
        } else {
          // if user not present then create new user in DB
          new User({
            displayName: profile.displayName,
            id: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log(`New Github User Created` + newUser);
            });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      // callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
