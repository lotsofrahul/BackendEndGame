const mongoose = require('mongoose');

const User2Schema = mongoose.Schema({
    "username" : String,
    "nickname" : String,
    "description" : String,
    "categories" : {
        type : Array,
        default : []
    },
    "datecreated" : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("User2", User2Schema);