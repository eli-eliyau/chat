import mongoose from "mongoose";
require("dotenv").config({ path: "./.env" });
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect('mongodb+srv://Projects:qcran4bvydnObCNu@cluster0.ywfj6da.mongodb.net/chatProject');
    console.log("mongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

export default main;
