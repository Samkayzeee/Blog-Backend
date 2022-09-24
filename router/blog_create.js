const {Router}  = require('express');
const Blog = require('../models/Blog');
const bodyParser = require('body-parser');


const router = Router();


const urlencodedParser = bodyParser.urlencoded({ extended:false });

router.post('/create', urlencodedParser, async(req, res) => {
    const {title,fullreview,category} = req.body;
    if (!(title || body || category )) {
        res.status(401).json({message: "You need to Fill all of the Above"});
    }
    const blog = await Blog.create({
        title:title,
        body:fullreview,
        category:category
    })
    res.send(blog);
    console.log(blog);
});


router.get('/created', urlencodedParser, async(req, res)=> {
    const show = await Blog.find();
    res.send(show);
});

module.exports = router;