const express= require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/',(req,res)=>{
    res.render('landing');
})

router.get('/blogs',async(req,res)=>{
    const blogs = await Blog.findAll();
    res.render('index',{blogs});
})

router.get('/blogs/:id',async(req,res)=>{
    const blog =  await Blog.findOne({
        where: {
            id : req.params.id
        }
    })
    res.render('show',{blog})
});


router.get('/blogs/new',(req,res)=>{
    res.send("route")
})

router.post('/blogs' ,async(req,res)=>{
    const blog = await Blog.create(req.body);
    console.log(req.body);
  
    res.send(blog);
})


module.exports = router;
