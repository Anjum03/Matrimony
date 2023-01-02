const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserSignup = require('../model/userSignup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/',(req,res,next)=>{
    res.status(200).json({
        msg:`Router of get request working`
    })
})

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user = new UserSignup({
                _id : new mongoose.Types.ObjectId,
                username: req.body.username,
                email : req.body.email,
                phone : req.body.phone,
                password : hash,
                userType: req.body.userType
            })
            user.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                consolelog(err);
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})

//ye username DB ka hai
router.post('/login',(req,res,next)=>{
    UserSignup.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                msg:`user not exist`
            })
        }
        else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                //when password not match
                if(!result){
                    return res.status(401).json({
                        msg:`Password not match`
                    })
                }
                //password matched
                if(result){
                    const token = jwt.sign({
                        username:user[0].user,
                        userType:user[0].userType,
                        email:user[0].email,
                        phone:user[0].phone
                    },
                    'This is dummy text',
                    {
                        expiresIn:"24h"
                    }
                    );
                    res.status(200).json({
                        username:user[0].username,
                        userType:user[0].userType,
                        email:user[0].email,
                        phone:user[0].phone,
                        token:token  //this token is line no 68
                    })
                }
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})

//copy the token and check in jwt website to result match

module.exports = router;