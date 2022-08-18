import mongoose from "mongoose";

var mongoDbUrl =
  process.env.MONGODB_URL ||
  "mongodb+srv://djenabac:Jimarie@clustermood.8qbju.mongodb.net/?retryWrites=true&w=majority"; //by default

console.log("mongoDbUrl=" + mongoDbUrl);
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "weather_db",
});
var thisDb = mongoose.connection;

thisDb.on("error", function () {
  console.log("mongoDb connection error = " + " for dbUrl=" + mongoDbUrl);
});

thisDb.once("open", function () {
  // we're connected!
  console.log("Connected correctly to mongodb database");
});

export default { thisDb };
