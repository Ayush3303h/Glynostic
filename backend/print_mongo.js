import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model("User", userSchema);

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ assessmentData: { $exists: true, $ne: null } }).lean();
  console.log(JSON.stringify(user.assessmentData, null, 2));
  process.exit(0);
}
run();
