import { Router } from 'express';
import Blog from '../models/Blog.js';
const router = Router();
import pkg from 'body-parser';
const { urlencoded } = pkg;
import multer, { diskStorage } from 'multer';
import { readFileSync } from 'fs';
const urlencodedParser = urlencoded({ extended:false });



const storage = diskStorage({
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
                data: readFileSync("uploads/"+ req.file.filename),
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

export default router;