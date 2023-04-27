const express = require ("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

require("dotenv").config();

const port = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});


