import mongoose from "mongoose";
require("dotenv").config({ path: "./.env" });
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(`${process.env.CONNECING_TO_DB}`);
    console.log("mongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

export default main;
