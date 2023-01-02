const jwt = require('jsonwebtoken');





module.exports = (req,res,next)=>{

    // (to check the code :- token shown in terminal)
    // const token = req.headers.authorization;
    // console.log(token);

    try{
        //spilt use for remove bearer word
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token, 'This is dummy text');
        console.log(verify);
        next();
        //we can use if else for admin or premium members and normal member
    }
    catch(error)
    {
        return res.status(401).json({
            msg:`Invaild Token`
        })
    }

}