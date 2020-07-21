const Course = require("../model/Course");
const Bootcamp = require("../model/Bootcamp")
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require("../utils/errorResponse");
const { exists } = require("../model/Course");

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path:"bootcamp",
      select:'name description'
    })
  }
  const courses = await query;

  res.status(200).json({
    success: true,
    count:courses.length,
    data: courses
  });
});

exports.getCourse = asyncHandler(async(req,res,next)=>{
  const course = await Course.findById(req.params.id).populate({
    path:'bootcamp',
    select:'name description'
  })
  if(!course){
    return next(
      new ErrorResponse(
        `course with this id ${req.params.id} does not exist`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
})

exports.addCourse = asyncHandler(async(req,res,next)=>{
  req.body.bootcamp = req.params.bootcampId
  const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  if(!bootcamp){
    next(new ErrorResponse(`Bootcamp with this id {req.params.bootcampid} does not exist`,404))
  }
  
  const course = await Course.create(req.body)
  res.status(200).json({
    success:true,
    data:course
  })
})

exports.updateCourse = asyncHandler(async(req,res,next)=>{
  const course = await Course.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  })

  if(!course){
    next(new ErrorResponse(`course with id ${req.params.id} does not exists`,404))
  }

  res.status(200).json({
    success:true,
    data:course
  })
})

exports.deleteCourse = asyncHandler(async(req,res,next)=>{
  const course =  await Course.findById(req.params.id)

  if(!course){
    next(new ErrorResponse(`course with this id ${req.params.id} does not exists`,404))
  }

  course.remove()

  res.status(200).json({
    success:true,
    data:{}
    })
})
