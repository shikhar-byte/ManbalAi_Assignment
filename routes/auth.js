const express= require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/user/register',(req,res)=>{
    res.render('auth/signup');
})

router.post('/user/register',async(req,res)=>{
    const {username , password } = req.body;
    if(!username || !password){
        res.status(422).json({error : "Please fill all the fields properly"});
    }

    try{
        const userExist = await User.findOne({
            where:{
                username : username
            }
        })

        if(userExist){
            return res.status(422).json({error : "User already exists"});
        }



        // Encrypt user password

        const encryptedPassword = await bcrypt.hash(password , 12);

        // Create User in DB
        const user = await User.build({
            username ,
            password : encryptedPassword
        })

       
        await user.save();


        if(user){
            res.status(201).json({status:1 , data:`Usernmame: ${username},CreatedAt : ${user.createdAt}` , msg: "Successful"});
        }
        res.status(500).json({status:0 , data:"null" , msg: "Failed"});
    
       
    }

    catch(err){
        console.log(err);
    }
   
})


router.get('/user/login',(req,res)=>{
    res.render('auth/login');
})


router.post('/user/login',async(req,res)=>{
    const {username , password } = req.body;
    if(!username || !password){
        res.status(422).json({error : "Please fill all the fields properly"});
    }

    try{
        const userLogin = await User.findOne({
            where:{
                username : username
            }
        })

        if(!userLogin){
            
            return res.status(422).json({Error: "Invalid Credentials"});
        }

        const ismatched =await bcrypt.compare(password, userLogin.password);

        if(ismatched){
                
        // Create token
        const token =jwt.sign(
            
            { id: userLogin.id },
            process.env.TOKEN_KEY,
        );
 
        // save user token
        userLogin.token = token;    

        await userLogin.save();

        res.status(201).json({status:1, data:`Username : ${username} , Token : ${userLogin.token}`, msg: "Successful"});

        }

       else{
           
       }

        res.status(500).json({status:0 , data : "null" ,msg :"Failed"});

    }

    catch(err){
        console.log(err);
    }
   
})

router.get('/user/:myaccount',async(req,res)=>{
    
   
    const user = await User.findOne({
        where:{
            username : req.params.myaccount
        }
    })

    if(user){
        res.status(201).json({status: 1 , data : `Username : ${user.username} , createdAt: ${user.createdAt}`, msg :"Successful"});
    }
    else{
        res.status(500).json({status: 0 , data: "null" , msg : "Failed"});
    }
    
    
})



module.exports = router;