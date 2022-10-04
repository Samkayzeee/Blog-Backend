const {Router}  = require('express');
const User = require('../models/User');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authControl = require('../controller/Authcontroller')



const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended:false });



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
    const user = await User.login(email, password);
    const jwtData = {_id:user._id, email: user.email}
    const token = jwt.sign(jwtData, process.env.SECRET_KEY, {expiresIn:"3h"})
    res.status(200).send({token:token})
} catch (error) {
    res.status(401).send('User not found')
}
   
});

module.exports = router;