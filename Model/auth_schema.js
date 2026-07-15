
let mongoose = require("mongoose")


let Schema = mongoose.Schema({

    name:{
        type:String,

    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    },
     role:{
        type:String
    }


})

let auth_data = mongoose.model("auth_datas",Schema)

module.exports= auth_data