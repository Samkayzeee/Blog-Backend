const {Schema, model} = require("mongoose");


const userSchema = new Schema ({
    fullname:{
        type:Schema.Types.String,
        required:[true, 'Please input your Fullname'],
        minLength:[7, 'Please input your Fullname']
    },
    username:{
        type:Schema.Types.String,
        required:[true, 'Please input your Username']
    },
    email:{
        type:Schema.Types.String,
        required:[true, 'Please input your email'],
        unique:true
    },
    password:{
        type:Schema.Types.String,
        required:[true, 'Please enter password']
    }
},
{
    timestamps:true
}
);


const User = model("users", userSchema);


module.exports = User;