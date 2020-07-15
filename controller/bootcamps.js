const Bootcamp = require('../model/bootcamp')

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Get all Bootcamps",
  });
};

exports.getBootcamp = (req, res, next) => {
  console.log(req.params.id)
  res.status(200).json({
    success: true,
    message: `show a Bootcamp ${req.params.id} `,
  });
};

exports.createBootcamp = async(req, res, next) => {
  try{
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  }catch{
    res.status(400).json({
      success:false
    })
  }
  
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete a Bootcamp ${req.params.id} `,
  });
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update a Bootcamp ${req.params.id} `,
  });
};





