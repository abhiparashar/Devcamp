const fs = require('fs')
const colors = require('colors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { connect } = require("http2");


//Load env variable
dotenv.config()

//load models
const Bootcamp = require('./model/Bootcamp')
const Course = require('./model/Course')

//connect to db
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JOSN files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);


//Import into databse
const importDB = async(res,err) => {
    try{
            await Bootcamp.create(bootcamps);
            await Course.create(courses);
            console.log('Data imported...'.green.inverse)
            process.exit()
    }catch(err){
        console.error(err)
    }
}

//deleted from databse
const destroyDB = async (res, err) => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data deleted...".red.inverse);
    process.exit()
  } catch (err) {
            console.error(err);
  }
};

if(process.argv[2]==='-i'){
    importDB()
}else if (process.argv[2] === "-d") {
    destroyDB()
}

