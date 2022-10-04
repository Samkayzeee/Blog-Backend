const {Router}  = require('express');
const User = require('../models/User');
const router = Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended:false });


router.post('/update', urlencodedParser, async (req, res) => {
    const body = req.body
    try {
        if (!(body)) {
            res.send({message:"Please input your email"})
        }
        const user = await User.findOneAndUpdate(
            { email:body.email },

            {
                $set:{ fullname:body.fullname,username:body.username }
            }
        );
        res.send({message:"Update Successful", user:user});
    } catch (error) {
        res.send({error, message:"Update not successful"});
        console.log(error);
    }

})

module.exports = router;