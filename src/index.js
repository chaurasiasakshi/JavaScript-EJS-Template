const express = require("express");
const path = require("path");
app = express();
port = 8080;

app.listen(port ,()=>{console.log( `My Server is running on ${port}`)});

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"../public")));

app.get("/"  , (req,res) => {
    res.render('index');
    });

// CRUD Operations
