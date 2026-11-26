import mongoose, { Schema } from "mongoose";

export type UserRole = "buyer" | "seller" | "admin";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
      required: true,
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
