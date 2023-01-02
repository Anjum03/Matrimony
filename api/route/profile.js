const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Matrimony = require('../model/profile')
const checkAuth = require('../middleware/checkAuth');

//getting frontend data(get request)
router.get('/',checkAuth,(req,res,next)=>{
    // res.status(200).json({
    //     msg:`Profile get request`
    // })

    Matrimony.find()
    .then(result=>{
        res.status(200).json({
            matrimonyData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//if someone want one data(get by ID)
router.get('/:id',checkAuth,(req,res,next)=>{
    
    console.log(req.params.id);
    Matrimony.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            matrimonyData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',checkAuth,(req,res,next)=>{
    // res.status(200).json({
    //     // msg:`Profile post request`
    // })
    // console.log(req.body.password); //to get single command in console
    // console.log(req.body); //to get all command in console
    
    const matrimony = new Matrimony({
        _id : new mongoose.Types.ObjectId,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password
    })
    matrimony.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newMatrimony:result
        })
    })
    .catch(err=>{
        consolelog(err);
        res.status(500).json({
            error:err
        })
    })
})


//delete request
router.delete('/:id',checkAuth,(req,res,next)=>{
    Matrimony.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            msg:`Matrimony Profile deleted`,
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


//put and patch difference? --> put = full data return updated, patch = only one data updated
//take put medthod

//put request(update request)
router.put('/:id',checkAuth,(req,res,next)=>{
    console.log(req.params.id)//to get output in console
    Matrimony.findOneAndUpdate({_id:req.params.id}, {
        $set:{
            email : req.body.email,
            phone : req.body.phone,
            password : req.body.password
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_MatrimonyProfile:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;