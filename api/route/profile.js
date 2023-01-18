const express = require('express');
const { app } = require('firebase-admin');
const router = express.Router();
const mongoose = require('mongoose');
const Matrimony = require('../model/profile')
// const checkAuth = require('../middleware/checkAuth');

//here we search search with key
router.get('/search/:key', async(req,res)=>{
    let data = await Matrimony.find({
        //      or for multiple search
        "$or":[
            
            {city:{$regex:req.params.key}},
            {state:{$regex:req.params.key}},
            {district:{$regex:req.params.key}},
            {caste:{$regex:req.params.key}},
            {subCaste:{$regex:req.params.key}}

        ]
    })

    console.log(req.params.key);
    res.send(data);

})



//getting frontend data(get request)
router.get('/',(req,res,next)=>{
    // res.status(200).json({
    //     msg:`Profile get request`
    // })

    Matrimony.find()
    .then(result=>{
        res.status(200).json({
            msg:`No data`,
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
router.get('/:id',(req,res,next)=>{
    
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

router.post('/',(req,res,next)=>{

    console.log(req.body); //to get all command in console
    
    const matrimony = new Matrimony({
        _id : new mongoose.Types.ObjectId,
        userName: req.body.userName,
        email : req.body.email,
        phone : req.body.phone,
        gender: req.body.gender,
        city:  req.body.city,
        district: req.body.district,
        state: req.body.state,
        gender: req.body.gender,
        DOB:  req.body.DOB,
        subCaste:  req.body.subCaste,
        caste:  req.body.caste
          
        
    })
    matrimony.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: "Successful",
            newMatrimony:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

// view by gender feature
router.post('/getallProfile',(req,res)=>{
    
    console.log(req.body);
    const gender = req.body.gender;
    // const gender = {};
    if(gender === "male"){
        Matrimony.find({gender:"female"})
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
    }
    else{

        Matrimony.find({gender:"male"})
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
    }
})

router.post('/getallProfilebySearch',(req,res)=>{
    
    console.log(req.body);
    const name = req.body.name;
    const city = req.body.city;
    const district = req.body.district;
      const state = req.body.state;
      const genderByName = req.body.gender;
      const DOBMin = req.body.DOBMin;
      const DOBMax = req.body.DOBMax; //min and max && condtion
      const caste = req.body.caste;
      const subCaste = req.body.subCaste;

    // const gender = {};
    if(genderByName ){
        Matrimony.find({gender:genderByName})
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
    }
    else if(name){

        Matrimony.find({name:name})
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
    }
    
    else if(city){

        Matrimony.find({city:city})
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
    }
    else if(district){

        Matrimony.find({district:district})
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
    }
    else if(state){

        Matrimony.find({state:state})
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
    }
    else if(DOBMin && DOBMax){
       
        // Matrimony.find({DOBMin:DOBMin, DOBMax:DOBMax})
        Matrimony.find({DOB: { $gte: DOBMin, $lte: DOBMax }})
        // Matrimony.find({})

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
        
        }

    else if(caste){

        Matrimony.find({caste:caste})
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
    }
    else if(subCaste){

        Matrimony.find({subCaste:subCaste})
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
    }
})






//delete request
router.delete('/:id',(req,res,next)=>{
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
router.put('/:id',(req,res,next)=>{
    console.log(req.body)//to get output in console
    Matrimony.findOneAndUpdate({_id:req.params.id}, {
        $set:{
        userName: req.body.userName,
        email : req.body.email,
        phone : req.body.phone,
        gender: req.body.gender,
        city:  req.body.city,
        district: req.body.district,
        state: req.body.state,
        gender: req.body.gender,
        DOB:  req.body.DOB,
        subCaste:  req.body.subCaste,
        caste:  req.body.caste
        }
    })
    .then(result=>{
        res.status(200).json({
            msg:`Matrimony Profile updated`,
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