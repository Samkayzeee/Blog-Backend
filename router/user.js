import { Router } from 'express';
import User from '../models/User.js';
import bodyParser from 'body-parser';
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import authControl from '../controller/Authcontroller.js';



const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended: true });



router.get('/signup', urlencodedParser, authControl, async(req, res) => {
    const profile = await User.findById(req.user._id);
    res.send(profile);
});



router.post('/signup',urlencodedParser, async (req, res) => {
    const body = req.body
    try {
        
        if (!(body)) {
            return res.status(400).send({error: "All data are needed"});
        }
        const user = await User.create({
            fullname:body.fullname,
            email:body.email,
            username:body.username,
            password:body.password
        });
        const jwtData = {_id:user._id, fullname: user.fullname}
        const token = sign(jwtData, process.env.SECRET_KEY, {expiresIn: "4h"});
        res.status(200).send({message: "Signup Successful", token:token, fullname:user.fullname, username:user.username});

    } catch (error) {
            res.status(400).send({message:"User not created"});
            console.log(error);
    }
       
});

router.post('/login',urlencodedParser, async(req, res) =>{
    const {email, password} = req.body;
try {
    const user = await User.login(email, password);
    const jwtData = {_id:user._id, email: user.email}
    const token = sign(jwtData, process.env.SECRET_KEY, {expiresIn:"4h"})
    res.status(200).send({ message:"Login Successful", token:token, fullname:user.fullname, username:user.username})
} catch (error) {
    if (!(email ) || !(password)) {
        res.status(401).send({ messsage:"Both Email and Password are required correctly" });
    }
    else{
        res.status(401).send({ message:"User Not Found" });
    }
    console.log(error);
}
   
});

export default router;