require("colors");
const path = require('path')
const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');
require("dotenv").config();

//db
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const authRoute = require("./routes/auth")
const courses = require("./routes/courses")

const app = express()

//Body-parser
app.use(express.json())
app.use(cookieParser())

//Dev logging middleware
app.use(morgan('dev'))

//file uplaod
app.use(fileUpload())

//set static folder
app.use(express.static(path.join(__dirname,'public')))

//middlewares
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", authRoute);

app.use(errorHandler);


const port = process.env.PORT || 8888
app.listen(port, () => {
  console.log(`server is listening at port ${port}`.yellow.bold);
});