const express = require('express')

//get other resources routes
const courseRouter = require("./courses");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require("../controller/bootcamps");


const router = express.Router()

//re-route into other resources resources
router.use("/:bootcampId/courses", courseRouter);

router.route("/:id/photo").put(bootcampPhotoUpload);
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router