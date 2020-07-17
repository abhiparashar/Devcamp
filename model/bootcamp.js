const mongoose = require('mongoose')

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  slug: String,
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  website: {
    type: String,
  },
  phone: {
    type: String,
    maxlength: 20,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    //GeoJson Point
    type: {
      type: String,
      enum: ["point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
      index: "2dsphere",
    },
    formattedaddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    //Array of strings
    type: [String],
    required: false,
    enum: [
      "web development",
      "mobile development",
      "UI/UX",
      "Data Science",
      "Business",
      "other",
    ],
  },
  averageRating: {
    type: Number,
    min: 1,
    max: 10,
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);