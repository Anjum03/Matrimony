const multer = require('multer');
const express = require('express');
const router = express.Router();
const ImageModel = require('../model/image');

//storage
const Storage = multer.diskStorage({
    destination:'uploads',
    filename: (req,file,cb)=>{
        cb(null, file.originalname); 
    }
})

const upload  = multer({
    storage:Storage
}).single('testImage')


router.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new ImageModel({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png/jpg/'
                }
            })
            newImage.save()
            .then(()=>res.send("Successfully Uploded"))
            .catch(err => console.log(err));
        }
    })
})


module.exports = router;