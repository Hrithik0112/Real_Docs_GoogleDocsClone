import mongoose, { mongo } from "mongoose";

const Connection = async () => {
  const URL = "mongodb+srv://slumdog4321:GWyDqq5259l5TMOf@cluster0.bpmb6sm.mongodb.net/DocsClone";
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Datbase Connected Succesfully");
  } catch (error) {
    console.log("error while connecting to the database", error);
  }
};
export default Connection;
