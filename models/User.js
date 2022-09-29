const {Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');
const { isEmail } = require('validator')

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
        unique:true,
        validate: [isEmail, 'Please enter a valid email']
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
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next();
})


const User = model("users", userSchema);


module.exports = User;