const mongoose = require("mongoose");

mongoose.connect("").then(() =>{
    console.log('Connected to MongoDB');
}).catch((error) =>
console.log(error));

Schema = mongoose.Schema({
    Task: {type : String , required: true},

});

MyModel = mongoose.model("MyApp",Schema);