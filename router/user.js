const {Router}  = require('express');
const User = require('../models/User');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const router = Router();

const urlencodedParser = bodyParser.urlencoded({ extended:false });



router.post('/signup',urlencodedParser, async (req, res) => {
    const {fullname, email, password, username} = req.body
    try {
        
        if (!(fullname || email || password || username)) {
            return res.status(400).send({error: "All data are needed"});
        }    
        const salt = await bcrypt.genSalt(10);
        pass_key = await bcrypt.hash(password, salt)
        console.log(pass_key);
        const user = await User.create({
            fullname:fullname,
            email:email,
            username:username,
            password:pass_key
        });
        res.send(user);
        res.json({message: "Signup Successful"});
    } catch (error) {
        res.status(500).json({message:"User not created"});
        console.log(error);
    }
       
});

router.post('/login',urlencodedParser, async(req, res) =>{
    const {email, password} = req.body;
    const user =  await User.findOne({ email:email });

    console.log(user);
    // res.send(user);

    // if (user) {
    //     const valid_password = await bcrypt.compare(password, user.password);
    //     if (valid_password) {
    //         res.status(200).json({ message: "Login Successful" });
    //     } else{
    //         res.status(400).json({ error: "Invalid Password" });
    //     } 
    // } else{
    //     res.status(401).json({ error: "User does not exist" });
    // }
   

const  username = user.username
const accessToken = jwt.sign(username, process.env.SECRET_KEY);
res.send({accessToken:accessToken});
});

module.exports = router;