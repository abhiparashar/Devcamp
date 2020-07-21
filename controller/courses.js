const Course = require("../model/Course");
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require("../utils/errorResponse");

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
