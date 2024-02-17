const express = require("express");
const path = require("path");
const Task = require("./database.js");
app = express();
port = 8080;

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.listen(port ,()=>{console.log( `My Server is running on ${port}`)});

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"../public")));

app.get("/"  , async (req,res) => {
    Tt = await Task.find()
    res.render('index',{
        page:"NodeJs Connectes with MongoDB",
        title:"Task Board",
        Tt:Tt
    });
    });

    // Read


app.get("/task",(req,res)=>{
    res.render("task")
});
app.get("/register",(req,res)=>{
    res.render("register")
});


app.post("/task",async(req,res)=>{
    const {Name,Date}=req.body;
    TaskData = new Task({
        Name,Date
    });
    tasksave = await TaskData.save();
    res.redirect('/');
});

app.get("/delete/:id",async(req,res)=>{
    // const {id} = req.params;
    try{
       const deleteData = await Task.findByIdAndDelete(req.params.id);
        res.redirect("/")

    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error")
    }
});

// CRUD Operations

app.get('/update/:id', async (req, res) => {
	id = req.params.id;
	updateData = await Task.findById({_id: id});
    if(updateData==null){res.redirect('/')}
    else {res.render('update',{Tt:updateData})}
	// res.render("update.ejs")
});

app.post("/update/:id", async (req, res) => {
	id = req.params.id;
	const {Name, Date} = req.body;
	updateData = await Task.findByIdAndUpdate({_id: id},
     {Name,Date	},
     {new: true});
	res.redirect("/")
});