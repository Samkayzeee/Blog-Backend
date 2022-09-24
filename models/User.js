const {Schema, model} = require("mongoose");


const userSchema = new Schema ({
    fullname:{
        type:Schema.Types.String,
        required:true
    },
    username:{
        type:Schema.Types.String,
        required:true
    },
    email:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    password:{
        type:Schema.Types.String,
        required:true,
    }
},
{
    timestamps:true
}
);


const User = model("users", userSchema);


module.exports = User;