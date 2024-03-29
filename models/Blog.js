import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title:{
        type:Schema.Types.String,
        required:true
    },
    body:{
        type:Schema.Types.String,
        required:true
    },
    category:{
        type:Schema.Types.String,
        required:true
    },
    image:{
        contentType:Schema.Types.String,
        data:Buffer,
    }
},
{
    timestamps:true
}
);

const Blog = model("blogs", blogSchema)

export default Blog;
