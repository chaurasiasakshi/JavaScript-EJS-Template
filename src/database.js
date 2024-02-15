const mongoose = require("mongoose");

// Connection with MongoDB
mongoose.connect("mongodb://localhost:27017/Todo").then(() =>{
    console.log('Connected to MongoDB');
}).catch((error) =>
console.log(error));

// Create Schema
const TaskSchema = new mongoose.Schema({
    Name: {type : String },
    Date: { type: Date }

});
// const RegSchema = new mongoose.Schema({
//     Name: {type : String , required: true},
//     Email: { type: String, required: true },
//     Image: { type: String, required: true },
//     Password: { type: String, required: true},
//     Confirm_Password : { type: String, required: true},
//     Created: { type: Date, required: true, default:Date.now}


// });

module.exports = mongoose.model("Store",TaskSchema);
// module.exports = mongoose.model("Register",RegSchema);

// RegModel = mongoose.model("Registration",Register);


// Exporting
//  module.exports = TaskSchema;