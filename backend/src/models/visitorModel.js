import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    purpose: {
      type: String,
      required: true,
    },
    personToMeet: {
      type: String,
      required: true,
    },
    idProofType:{
      type:String,
      enum:["Aadhaar","PAN","Driving License","Passport"],
    },
    checkInTime: {
      type: Date,
      default: Date.now,
    },
    checkOutTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Active", "Completed"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);
