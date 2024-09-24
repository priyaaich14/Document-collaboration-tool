import mongoose from "mongoose";

const init = () => {
  mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: "google_docs",
  });

  const db = mongoose.connection; // Use const for db

  if (process.env.DROP) {
    db.dropDatabase();
  }

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Connected to database.."));
};

export const dbInit = init; // Use export for ES6 module
