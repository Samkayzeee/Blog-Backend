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

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error ("Incorrect Password")
    }
    throw Error("Email not found")
}


const User = model("users", userSchema);


module.exports = User;