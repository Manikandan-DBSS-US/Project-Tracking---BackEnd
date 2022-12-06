import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Please provide project name"],
      minlength: 3,
    },
    projectDescription: {
      type: String,
      required: [true, "Please provide project description"],
      minlength: 3,
      maxlength: 300,
    },
    clientName: {
      type: String,
      required: [true, "Please provide client name"],
    },
    projectStartDate: {
      type: String,
      required: [true, "Please provide project start date"],
    },
    projectEndDate: {
      type: String,
      required: [true, "Please provide project end date"],
    },
    technologiesUsed: {
      type: Array,
      required: [true, "Please provide atleast one"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", ProjectSchema);
