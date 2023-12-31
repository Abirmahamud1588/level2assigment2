import { Schema, model } from "mongoose";
import { User } from "./user/user.interface";

const userSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String] },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userModel = model<User>("User", userSchema);
