const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const transactionRoutes = require("./routes/transaction");
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const { MONGOD_URI } = process.env;

app.use(bodyParser.json());
app.use(cookieParser())

app.use(transactionRoutes);
app.use(authRoutes)

app.use('/', (req, res ) => {
  res.send('WORKING')
})

mongoose
  .connect(MONGOD_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
