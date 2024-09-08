const mongoose = require('mongoose');

//db creation
const connectionString = "mongodb://localhost:27017/expressDB";
mongoose.connect(connectionString);

const UserSchema = mongoose.Schema({
    username : String,
    name : String,
    age : Number
});

module.exports = mongoose.model("users", UserSchema);