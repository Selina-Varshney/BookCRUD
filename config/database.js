const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/mern_crud";

mongoose.Promise = require("bluebird");
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  promiseLibrary: require("bluebird"),
});

module.exports = mongoose;
