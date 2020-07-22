const NodeGeocoder = require("node-geocoder");

const options = {
    provider:process.env.GEOCODER_PROVIDER,
    httpAdapter:"https",
    apikey:process.env.GEOCODER_API_KEY,
    formatter:null
}

// console.log(options)
const geocoder = NodeGeocoder(options);

module.exports = geocoder