let mongoose = require("mongoose");
let dotenv = require("dotenv");
dotenv.config();

let mongo_db_url = process.env.mongo_db_url;
console.log(mongo_db_url)

mongoose
  .connect(mongo_db_url)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database not connected");
  });

module.exports = mongoose;
