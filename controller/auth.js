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
