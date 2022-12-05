import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      trim: true,
      unique: true,
      required: [true, "Please provide id"],
    },
    userName: {
      type: String,
      required: [true, "Please provide username"],
      unique: true, 
    },
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone number"],
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide valid mobile number",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Please provide correct gender'",
      },
      required: [true, "Please provide gender"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide date of birth"],
      trim: true,
    },
    isActive: {
      type: Number,
      defaul: 1, //1-true,0-false
    },
    role: {
      type: Number,
      default: 0, //0-user,1-admin
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
