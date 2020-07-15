const express = require("express")
const morgan = require('morgan')
const colors = require('colors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db');

//Load env variables
require("dotenv").config();

//db
connectDB();

//Route files
const bootcamp = require("./routes/bootcamps");

const app = express()

//Body-parser
app.use(express.json())

//Dev logging middleware
app.use(morgan('dev'))

//middlewares
app.use(morgan('dev'));
app.use("/api/v1", bootcamp);


const port = process.env.PORT || 8888
app.listen(port, () => {
  console.log(`server is listening at port ${port}`.yellow.bold);
});