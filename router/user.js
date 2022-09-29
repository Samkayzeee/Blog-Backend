const {Router}  = require('express');
const User = require('../models/User');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authControl = require('../controller/Authcontroller')



const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended:false });



router.get('/signup', urlencodedParser, authControl, async(req, res) => {
    const profile = await User.findById(req.user._id);
    res.send(profile);
})



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
        const token = jwt.sign(jwtData, process.env.SECRET_KEY, {expiresIn: "3h"});
        res.status(200).send({message: "Signup Successful",token:token});

     

    } catch (error) {
            res.status(400).send({message:"User not created"});
            console.log(error);
    }
       
});

router.post('/login',urlencodedParser, async(req, res) =>{
    const {email, password} = req.body;

    try {
    const user =  await User.findOne({ email:email });

    if (user) {
        const valid_password = await bcrypt.compare(password, user.password);
        if (valid_password) {
            const jwtData = {_id:user._id, fullname:user.fullname}
            const token = jwt.sign(jwtData, process.env.SECRET_KEY, {expiresIn: "3h"});
            res.status(200).send({ message: "Login Successful",token:token, password:user.password });


        } else{
            res.status(400).json({ error: "Invalid Password" });
        } 
    } else{
        res.status(401).json({ error: "User does not exist" });
    }


    } catch (error) {
        res.status(400).json({message : "Their was a problem Login you in"})
        console.log(error);
    }
   
});

module.exports = router;