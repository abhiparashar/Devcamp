const anyncHandler = require('../middleware/asyncHandler')
const User = require('../model/User')
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

exports.register = asyncHandler(async(req,res,next)=>{
    const { name,email,password,role} = req.body
    const user = await User.create({ name, email, password, role})
    //create a token
    const token = user.getSignedJwtToken();
    res.status(200).json({
      success: true,
      token
    });
})

exports.login = asyncHandler(async(req,res,next)=>{
    const{email,password} = req.body
    //validate email and password
    if(!email||!password){
        return res.json(new ErrorResponse('Please provide email and password',400))
    }
    //check for user
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return res.json(
          new ErrorResponse("Invalid credentials", 401)
        );
    }
    //Match the password
    const isMatch = await user.matchPassword(password);
    //if does not match
    if(!isMatch){
         return res.json(new ErrorResponse("Invalid credentials", 401));
    }
    //Create token
    const token = user.getSignedJwtToken();
    res.status(200).json({
      success: true,
      token,
    });
})