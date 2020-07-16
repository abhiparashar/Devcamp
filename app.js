const express = require("express")
const morgan = require('morgan')
const colors = require('colors')
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');

//Load env variables
require("dotenv").config();

//db
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express()

//Body-parser
app.use(express.json())

//Dev logging middleware
app.use(morgan('dev'))

//middlewares
app.use("/api/v1", bootcamps);
app.use(errorHandler);


const port = process.env.PORT || 8888
app.listen(port, () => {
  console.log(`server is listening at port ${port}`.yellow.bold);
});