const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./db/db')
const express = require("express");
const cors = require("cors");
const app = express();
const customerRouter = require('./routes/customer.router');
const esewaRouter = require('./routes/esewa.router');
const orderRouter = require('./routes/order.router');
app.use(cors());

// Middleware
app.use(express.json());
 connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use('/customers',customerRouter);

app.use('/orders',orderRouter)
app.use("/esewa", esewaRouter);

module.exports = app; // export the app
