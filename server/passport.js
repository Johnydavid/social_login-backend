const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleUser = require("./models/GoogleUser");
const GithubUser = require("./models/GithubUser");
const FacebookUser = require("./models/FacebookUser");
const passport = require("passport");
require("dotenv").config();

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
      callbackURL: "https://social-media-login.onrender.com/auth/google/callback",
      // callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(profile);
      GoogleUser.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // If User already created in DB

          console.log(`user is: `, currentUser);
        } else {
          // if user not present then create new user in DB
          new GoogleUser({
            displayName: profile.displayName,
            googleId: profile.id,
            image: profile.photos[0].value,
          })
            .save()
            .then((newGoogleUser) => {
              console.log(`New Google User Created` + newGoogleUser);
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
      callbackURL: "https://social-media-login.onrender.com/auth/github/callback",
      // callbackURL: "http://localhost:8080/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(profile);
      GithubUser.findOne({ githubId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // If User already created in DB

          console.log(`user is: `, currentUser);
        } else {
          // if user not present then create new user in DB
          new GithubUser({
            displayName: profile.displayName,
            githubId: profile.id,
          })
            .save()
            .then((newGithubUser) => {
              console.log(`New Github User Created` + newGithubUser);
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
      // callbackURL: "https://social-media-login.onrender.com/auth/facebook/callback",
      callbackURL: "http://localhost:8080/auth/facebook/callback"
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
