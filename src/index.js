const express = require("express");
const path = require("path");
const DB = require("./database.js");
app = express();
port = 8080;

bcrypt = require("bcrypt");


// Middleware
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.listen(port ,()=>{console.log( `My Server is running on ${port}`)});

// EJS
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"../public")));

app.get("/task",(req,res)=>{
    res.render("task")
});

// Create
app.post("/task",async(req,res)=>{
    const {Name,Date}=req.body;
    TaskData = new DB({
        Name,Date
    });
    tasksave = await TaskData.save();
    res.redirect('/');
});

// Read
app.get("/"  , async (req,res) => {
    Tt = await DB.find()
    res.render('index',{
        page:"NodeJS",
        Tt:Tt
    });
    });

// Update
app.get('/update/:id', async (req, res) => {
	id = req.params.id;
	updateData = await DB.findById({_id: id});
    if(updateData==null){res.redirect('/')}
    else {res.render('update',{Tt:updateData})}
});

app.post("/update/:id", async (req, res) => {
	id = req.params.id;
	const {Name, Date} = req.body;
	updateData = await DB.findByIdAndUpdate({_id: id},
     {Name,Date	},
     {new: true});
	res.redirect("/")
});

// Delete
app.get("/delete/:id",async(req,res)=>{
    // const {id} = req.params;
    try{
       const deleteData = await DB.findByIdAndDelete(req.params.id);
        res.redirect("/")

    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error")
    }
});

// Register
app.get("/register",(req,res)=>{
    res.render("register")
});

app.post('/register', async(req,res)=>{
    const data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        c_password:req.body.c_password
    }
    const existingUser = await DB.findOne({name:data.name});
    if(existingUser){
        res.send("User Already Exists");
    }
    else{
        hashp=await bcrypt.hash(data.password,2);
        data.password=hashp;
        const userData = await DB.insertMany(data);
        console.log(userData)

        res.redirect("/register")
    }
});


// Login
app.get("/login",(req,res)=>{
    res.render("login")
});


app.post('/login', async(req, res) => {
    try{
        const check = await DB.findOne({uname: req.body.uname});
        if(check){
            const result = await phash.compare(req.body.password, check.password);
            if(result){
                res.send('Login Successful')
                
            }
            else{
                res.send('Incorrect password')
            }
        }
        else{
            res.send('User does not exist')
        }
    }
    catch(error){
        res.send(error)
    }
});
