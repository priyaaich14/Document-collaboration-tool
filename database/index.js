const mongoose = require("mongoose");

const init = () => {
  mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: "google_docs",
  });

  const db = mongoose.connection;

  if (process.env.DROP) {
    db.dropDatabase();
  }

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", console.log.bind(console, "Connected to database.."));
};

exports.dbInit = init;
