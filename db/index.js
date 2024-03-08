const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URL);
    dbInstance = connectionInstance;
    console.log(`\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;