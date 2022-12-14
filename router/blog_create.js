const {Router}  = require('express');
const Blog = require('../models/Blog');
const router = Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const urlencodedParser = bodyParser.urlencoded({ extended:false });



const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, req.originalname)
    }
})
const upload = multer({storage: storage});


router.post('/create', urlencodedParser, upload.single('image'), async(req, res) => {
    const body = req.body;
    try {
        if (!(body)) {
            res.status(401).json({message: "You need to Fill all of the Above"});
        }
        const blog = await Blog.create({
            title:body.title,
            body:body.fullreview,
            category:body.category,
            image: {
                data: fs.readFileSync("uploads/"+ req.file.filename),
                contentType: "image/png"
            }
        })
        res.send({done:body, message:"Blog Created", blog});
    } catch (error) {
        res.send('Their was an error uploading your blog');
        console.log(error);
    }
});


router.get('/created', urlencodedParser, async(req, res)=> {
    const show = await Blog.find();
    res.send(show);
});



router.delete('/delete', urlencodedParser, async(req, res) =>{
    const {id} = req.body
    try {
        await Blog.deleteOne({_id : id});
        res.status(200).json({message: "Deleted"});
    } catch (error) {
        res.status(404).json({message: "id not found"});
    }
});

module.exports = router;