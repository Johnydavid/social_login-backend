const router = require("express").Router();
const passport = require("passport");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const GithubUser = require("../models/GithubUser");

// const CLIENT_URL = "http://localhost:3000/";
const CLIENT_URL = "https://guvi-socialmedia.netlify.app/";


router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",      
      user: req.user,
    
    });
   
  }else{
    res.status(403).json({error:true, message: "Not Authorized"});
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.route("/github/read").get((req, res) => {
  GithubUser.find()
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(400).json("Error : " + err);
    });
});

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);



module.exports = router;
