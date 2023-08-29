import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from 'bcrypt';
import pkg from 'validator';
const { isEmail } = pkg;

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
    const salt = await genSalt();
    const hashedPassword = await hash(this.password, salt)
    this.password = hashedPassword
    next();
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error ("Incorrect Password")
    }
    throw Error("Email not found")
}


const User = model("users", userSchema);


export default User;