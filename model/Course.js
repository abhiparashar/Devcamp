const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add title of the course"],
  },
  description: {
    type: String,
    required: [true, "Please add description of the course"],
  },
  weeks: {
    type: String,
    required: [true, "Please add weeks of the course"],
  },
  tuition: {
    type: String,
    required: [true, "Please add tuition fee of the course"],
  },
  weeks: {
    type: String,
    required: [true, "Please add weeks of the course"],
  },
  minimumSkill: {
    type: String,
    enum: ["beginner", "intermediate","advanced"],
    required: [true, "Please add minimumSkills for the course"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);