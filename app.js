require("dotenv").config();
require("colors");
const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');

//db
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const authRoute = require("./routes/auth")

const app = express()

//Body-parser
app.use(express.json())
app.use(cookieParser())

//Dev logging middleware
app.use(morgan('dev'))

//middlewares
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/auth", authRoute);
app.use(errorHandler);


const port = process.env.PORT || 8888
app.listen(port, () => {
  console.log(`server is listening at port ${port}`.yellow.bold);
});