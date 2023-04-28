const express = require('express')
const passport = require('passport')
const router = express.Router()


// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

const CLIENT_URL = "http://localhost:8080/"

router.get("/login/failed", (req, res)=>{
  res.status(401).json({
    success:false,
    message:"failure"

  })
})

router.get("/logout", (req, res)=>{
  req.logout();
  res.redirect(CLIENT_URL)
})

router.get("/login/success", (req, res)=>{
  if(req.user){
    res.status(200).json({
      success:true,
      message:"success",
      user: req.user
  
    })

  }
  
})

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    
    successRedirect: CLIENT_URL, failureRedirect: "login/failed"}),
  (req, res) => {
    res.redirect('/')
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('/')
  })
})

module.exports = router