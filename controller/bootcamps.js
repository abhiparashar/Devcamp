const path = require('path')
const Bootcamp = require('../model/Bootcamp')
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

exports.getBootcamps = asyncHandler(async(req, res, next) => {
      const bootcamps = await Bootcamp.find();
      res.status(200).json({
        success: true,
        count:bootcamps.length,
        data: bootcamps
      });
})

exports.getBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
      );
      res.status(200).json({
        success: true,
        data: bootcamp,
      });
  }
})

exports.createBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
})  


exports.updateBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!bootcamp){
      return next(
        new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
})

exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400)
      );
    }
    res.status(200).json({
      success: true,
    });
}) 

exports.bootcampPhotoUpload = asyncHandler(async(req,res,next)=>{
  const bootcamp = await Bootcamp.findById(req.params.id)

  if(!bootcamp){
    return next(new ErrorResponse(`bootcamp with this id ${req.params.id} does nor exist`),400)
  }

  if(!req.files){
    return next(new ErrorResponse('please upload file',400))
  }

  const file = req.files.file

  //Make sure the image is a photo
  if(!file.mimetype.startsWith('image')){
    return next(new ErrorResponse('the file is not image',400))
  }

  //check fileSize
  if(file.size>process.env.MAX_SIZE_UPLOAD){
    return next(new ErrorResponse(`please upload file size less tha ${process.env.MAX_SIZE_UPLOAD}`,400))
  }

  //create custom file name
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`
  console.log(file.name)

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`,async err=>{
    if(err){
      console.log(err);
      return next(new ErrorResponse(`problem with file uplaod`,500))
    }
    const app = await Bootcamp.findByIdAndUpdate(req.params.id,{photo:file.name})

    res.status(200).json({
      status:true,
      data:file.name
    })
  })
})







