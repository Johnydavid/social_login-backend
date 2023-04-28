const express = require("express");
const router = express.Router()

// Login Page
// GET

router.get('/', (req, res)=>{

    res.send('Login')


})


module.exports = router;