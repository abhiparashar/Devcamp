const fs = require('fs')
const colors = require('colors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { connect } = require("http2");


//Load env variable
dotenv.config({path:'./config/config.env'})

//load models
const Bootcamp = require('./model/bootcamp')

//connect to db
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JOSN files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))

//Import into databse
const importDB = async(res,err) => {
    try{
            await Bootcamp.create(bootcamps);
            console.log('Data imported...'.green.inverse)
    }catch(err){
        console.error(err)
    }
}

//deleted from databse
const destroyDB = async (res, err) => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data deleted...".red.inverse);
  } catch (err) {
            console.error(err);
  }
};

if(process.argv[2]==='-i'){
    importDB()
}else if (process.argv[2] === "-d") {
    destroyDB()
}

