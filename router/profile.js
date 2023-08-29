import { Router } from 'express';
import User from '../models/User.js';
const router = Router();
import pkg from 'body-parser';
const { urlencoded } = pkg;
const urlencodedParser = urlencoded({ extended:false });


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

export default router;