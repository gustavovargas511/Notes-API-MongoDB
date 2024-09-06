const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${db.connection.host}`);
};

module.exports = connectDB;
